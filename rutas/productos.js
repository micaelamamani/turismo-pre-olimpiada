const express = require("express");
const router = express.Router();
const db = require("../bd");
// Valores válidos (simulan ENUM de tu SQL)
const categoriasValidas = ["paquete", "hotel", "vuelo", "auto", "excursion"];
const destacadosValidos = ["promo", "recomendado", "normal"];
//todos los productos
router.get("/", (req, res) => {
    const { categoria, destacado } = req.query;
    let sql = `SELECT 
                    p.*, 
                    MIN(d.fecha_salida) AS fecha_salida, 
                    MIN(d.fecha_regreso) AS fecha_regreso, 
                    MAX(d.estado) AS estado, 
                    MAX(d.cupo) AS cupo 
               FROM Productos p 
               LEFT JOIN Disponibilidad_producto d ON p.ID_producto = d.ID_producto 
               WHERE 1=1 
               GROUP BY p.ID_producto, p.nombre, p.precio_unitario, p.imagen, p.categoria, p.destacado `;

    let params = [];

    if (categoria) {
        sql += " AND categoria = ?";
        params.push(categoria);
    }
    if (destacado) {
        sql += " AND destacado = ?";
        params.push(destacado);
    }
    db.query(sql, params, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(result);
    });
});
//Busca id
router.get("/:id", (req, res) => {

    const id = req.params.id;

    const sql = `SELECT p.*,
    d.ID_disponibilidad,d.fecha_salida,d.fecha_regreso,d.estado,d.cupo
    FROM Productos p
    LEFT JOIN Disponibilidad_producto d
    ON p.ID_producto=d.ID_producto
    WHERE p.ID_producto=?`;
    db.query(sql, [id],
        (error, result) => {
            if (error)
                return res.status(500).json({ error: error.message });
            if (result.length === 0) {
                return res.status(404).json({ mensaje: "No encontrado" });
            }
            const producto = {
                ID_producto: result[0].ID_producto,
                nombre: result[0].nombre,
                precio_unitario: result[0].precio_unitario,
                imagen: result[0].imagen,
                categoria: result[0].categoria,
                destacado: result[0].destacado,
                fechas: result
                    .filter(f => f.ID_disponibilidad !== null)
                    .map(f => ({
                        ID_disponibilidad: f.ID_disponibilidad,
                        fecha_salida: f.fecha_salida,
                        fecha_regreso: f.fecha_regreso,
                        estado: f.estado,
                        cupo: f.cupo
                    }))
            };
            res.json(producto);
        }
    );

});
//Crear producto
router.post("/", (req, res) => {
    const { nombre, precio_unitario, imagen, categoria, destacado } = req.body;

    if (!nombre || precio_unitario == null || !categoria || !destacado || !imagen) {
        return res.status(400).json({
            error: "Faltan datos obligatorios"
        });
    }
    if (precio_unitario <= 0) {
        return res.status(400).json({
            error: "Precio inválido"
        });
    }
    if (!categoriasValidas.includes(categoria)) {
        return res.status(400).json({ error: "Categoría inválida" });
    }
    if (!destacadosValidos.includes(destacado)) {
        return res.status(400).json({ error: "Valor de destacado inválido" });
    }
    const sql = `INSERT INTO Productos (nombre, precio_unitario, imagen, categoria, destacado)
        VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [nombre, precio_unitario, imagen, categoria, destacado], (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json({ mensaje: "Producto creado correctamente", ID_producto: result.insertId });
    }
    );
});
//UPDATE PRODUCTO
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, precio_unitario, imagen, categoria, destacado } = req.body;

    if (!nombre || precio_unitario == null || !categoria || !destacado || !imagen) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    if (precio_unitario <= 0) {
        return res.status(400).json({
            error: "Precio inválido"
        });
    }
    if (!categoriasValidas.includes(categoria)) {
        return res.status(400).json({ error: "Categoría inválida" });
    }
    if (!destacadosValidos.includes(destacado)) {
        return res.status(400).json({ error: "Valor de destacado inválido" });
    }

    const sql = `UPDATE Productos SET nombre = ?, precio_unitario = ?, imagen = ?, categoria = ?, destacado = ? WHERE ID_producto = ?`;

    db.query(sql, [nombre, precio_unitario, imagen, categoria, destacado, id], (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto actualizado correctamente" });
    }
    );
});
//Eliminar producto
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM Productos WHERE ID_producto = ?", [id], (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado correctamente" });
    }
    );
});

module.exports = router;