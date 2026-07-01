const express = require("express"); const router = express.Router(); const db =
    require("../bd");
// VER TODOS LOS PEDIDOS
router.get("/", (req, res) => {
    db.query("SELECT * FROM Pedidos", (error, result) => {
        if (error) return res.send(error);
        res.json(result);
    }
    );
});
// REPORTE DE VENTAS POR MES
router.get("/ventas/:mes", (req, res) => {

    const mes = req.params.mes;

    const sql = `SELECT pr.categoria,
    SUM(d.cantidad) AS vendidos, SUM(d.precio * d.cantidad) AS ganancias
    FROM Pedidos p
    INNER JOIN Detalles_pedidos d
    ON p.ID_pedido=d.ID_pedido
    INNER JOIN Productos pr
    ON d.ID_producto=pr.ID_producto
    INNER JOIN Disponibilidad_producto dp
    ON d.ID_disponibilidad=
    dp.ID_disponibilidad
    WHERE
    MONTH(dp.fecha_salida)=? AND p.estado='entregado' GROUP BY pr.categoria`;
    db.query(sql, [mes], (error, result) => {
        if (error) {
            return res
                .status(500)
                .json(error);
        }
        res.json(result);
    }
    );

});
// CREAR PEDIDO
router.post("/pedido", (req, res) => {
    const { ID_cliente, productos } = req.body;
    if (!ID_cliente || !productos || productos.length === 0) {
        return res.status(400).json({
            mensaje: "Faltan datos"
        });
    }
    const precio_total = productos.reduce(
        (suma, producto) =>
            suma +
            Number(producto.precio_unitario) *
            Number(producto.cantidad),
        0
    );

    // VALIDAR Y DESCONTAR CUPO
    const descontarCupos = (index) => {

        if (index >= productos.length) {

            // Crear pedido SOLO si todos los cupos se reservaron
            db.query(
                "INSERT INTO Pedidos (ID_cliente, precio_total, estado) VALUES (?, ?, 'pendiente')",
                [ID_cliente, precio_total],
                (error, result) => {

                    if (error) {
                        return res.status(500).send(error);
                    }

                    const ID_pedido = result.insertId;

                    const detalles = productos.map(producto => [
                        ID_pedido,
                        producto.ID_producto,
                        producto.cantidad,
                        producto.precio_unitario,
                        producto.ID_disponibilidad
                    ]);

                    db.query("INSERT INTO Detalles_pedidos (ID_pedido, ID_producto, cantidad, precio, ID_disponibilidad) VALUES ?", [detalles],
                        (error2) => {

                            if (error2) {
                                return res.status(500).send(error2);
                            }

                            res.json({
                                mensaje: "Pedido creado y cupo reservado",
                                ID_pedido,
                                estado: "pendiente",
                                precio_total
                            });
                        }
                    );
                }
            );

            return;
        }

        const producto = productos[index];

        db.query(
            `
            UPDATE Disponibilidad_producto
            SET cupo = cupo - ?
            WHERE ID_producto = ?
            AND cupo >= ?
            `,
            [
                producto.cantidad,
                producto.ID_producto,
                producto.cantidad
            ],
            (error, result) => {

                if (error) {
                    return res.status(500).send(error);
                }

                if (result.affectedRows === 0) {
                    return res.status(400).json({ mensaje: "No hay cupo suficiente" });
                }
                descontarCupos(index + 1);
            }
        );
    };

    descontarCupos(0);
});
// VER UN PEDIDO ESPECÍFICO Y SUS DETALLES 
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT Pedidos.ID_pedido, Pedidos.ID_cliente, Pedidos.precio_total, Pedidos.fecha, Pedidos.estado, Detalles_pedidos.ID_detalle, Detalles_pedidos.ID_producto, Detalles_pedidos.cantidad, Detalles_pedidos.precio
    FROM Pedidos
    LEFT JOIN Detalles_pedidos
    ON Pedidos.ID_pedido= Detalles_pedidos.ID_pedido
    WHERE Pedidos.ID_pedido= ?`;
    db.query(sql, [id], (error, result) => {
        if (error) return res.send(error);
        if (result.length === 0) {
            return res.json({ mensaje: "Pedido no encontrado" });
        }
        res.json(result);
    });
});
// VER PEDIDOS DE UN CLIENTE (ADMIN)
// VER PEDIDOS DE UN CLIENTE (ADMIN)
router.get("/cliente/:id", (req, res) => {

    const id =
        req.params.id;

    const sql = `

SELECT

p.ID_pedido,
p.ID_cliente,
p.estado,
p.precio_total,
p.fecha,

d.ID_detalle,
d.cantidad,
d.precio,

pr.ID_producto,
pr.nombre,
pr.categoria,
pr.imagen,

c.usuario,
c.nombre AS nombre_cliente,
c.apellido,
c.email,

dp.fecha_salida,
dp.fecha_regreso

FROM Pedidos p

INNER JOIN Clientes c
ON p.ID_cliente =
c.ID_cliente

INNER JOIN Detalles_pedidos d
ON p.ID_pedido =
d.ID_pedido

INNER JOIN Productos pr
ON d.ID_producto =
pr.ID_producto

LEFT JOIN Disponibilidad_producto dp
ON d.ID_disponibilidad =
dp.ID_disponibilidad

WHERE p.ID_cliente = ?

ORDER BY
p.ID_pedido DESC

`;

    db.query(
        sql,
        [id],
        (error, result) => {
            if (error) {
                return res
                    .status(500)
                    .json(error);
            }
            res.json(result);
        }
    );
});
// CAMBIAR ESTADO
router.put("/:id/estado", (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;
    const estadosValidos = ["pendiente","cancelado","entregado"];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
            mensaje: "Estado inválido"
        });
    }
    db.query(
        "UPDATE Pedidos SET estado=? WHERE ID_pedido=?",
        [estado, id],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Pedido no encontrado"
                });
            }
            // SI SE ENTREGA → GUARDAR EN HISTORIAL
            if (estado === "entregado") {
                db.query(
                    `INSERT IGNORE INTO historial_pedidos (ID_pedido)
                    VALUES (?)`,
                    [id],(error2) => {
                        if (error2) {
                            return res.status(500)
                            .send(error2);
                        }
                        res.json({
                            mensaje:
                            "Pedido entregado y agregado al historial"
                        });
                    }
                );
            } else {
               res.json({
                    mensaje:
                    "Estado actualizado"
                });
            }
        }
    );
});
// ELIMINAR PEDIDO
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM Pedidos WHERE ID_pedido = ?", [id], (error, result) => {
        if (error) return res.send(error);
        if (result.affectedRows === 0) {
            return res.json({
                mensaje: "Pedido no encontrado"
            });
        }
        res.json({
            mensaje: "Pedido eliminado"
        });
    });
});
module.exports = router;