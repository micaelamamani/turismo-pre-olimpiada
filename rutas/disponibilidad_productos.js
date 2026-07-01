const express = require("express");
const router = express.Router();
const db = require("../bd");

// TODAS LAS DISPONIBILIDADES
router.get("/", (req, res) => {
    const sql = `SELECT d.*, p.nombre, p.precio_unitario FROM Disponibilidad_producto d
        INNER JOIN Productos p ON d.ID_producto = p.ID_producto`;

    db.query(sql, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(result);
    });
});

// GET POR ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM Disponibilidad_producto WHERE ID_disponibilidad = ?`;

    db.query(sql, [id], (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        if (result.length === 0) {
            return res.status(404).json({ mensaje: "Disponibilidad no encontrada" });
        }
        res.json(result[0]);
    });
});

// CREAR DISPONIBILIDAD
router.post("/", (req, res) => {
    const { ID_producto, fecha_salida, fecha_regreso, cupo } = req.body;

    if (!ID_producto || !fecha_salida || cupo == null) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    if (cupo < 0) {
        return res.status(400).json({
            error: "Cupo inválido"
        });
    }
    if (fecha_regreso && new Date(fecha_regreso) < new Date(fecha_salida)) {
        return res.status(400).json({
            error: "La fecha de regreso no puede ser menor que la salida"
        });
    }
    const estado=cupo > 0 ? "disponible": "agotado";

    const sql = `
        INSERT INTO Disponibilidad_producto
        (ID_producto, fecha_salida, fecha_regreso, estado, cupo)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [ID_producto, fecha_salida, fecha_regreso,estado, cupo],
        (error, result) => {
            if (error) return res.status(500).json({ error: error.message });

            res.status(201).json({
                mensaje: "Disponibilidad creada",
                ID_disponibilidad: result.insertId
            });
        }
    );
});
// ACTUALIZAR DISPONIBILIDAD
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { fecha_salida, fecha_regreso, cupo } = req.body;

    const estadosValidos = ["disponible", "agotado"];

    if (!fecha_salida || cupo == null) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    if (cupo < 0) {
        return res.status(400).json({
            error: "Cupo inválido"
        });
    }
    if (fecha_regreso && new Date(fecha_regreso) < new Date(fecha_salida)) {
        return res.status(400).json({
            error: "La fecha de regreso no puede ser menor que la salida"
        });
    }
    const estado= cupo > 0 ? "disponible" : "agotado";

    const sql = `
        UPDATE Disponibilidad_producto
        SET fecha_salida = ?, fecha_regreso = ?, estado = ?, cupo = ?
        WHERE ID_disponibilidad = ?
    `;

    db.query(
        sql,
        [fecha_salida, fecha_regreso, estado, cupo, id],
        (error, result) => {
            if (error) return res.status(500).json({ error: error.message });

            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: "No existe esa disponibilidad" });
            }

            res.json({ mensaje: "Actualizado correctamente" });
        }
    );
});
// DELETE DISPONIBILIDAD
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM Disponibilidad_producto WHERE ID_disponibilidad = ?",
        [id],
        (error, result) => {
            if (error) return res.status(500).json({ error: error.message });

            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: "No existe esa disponibilidad" });
            }

            res.json({ mensaje: "Eliminado correctamente" });
        }
    );
});

module.exports = router;