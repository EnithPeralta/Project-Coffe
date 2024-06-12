const express = require("express");
const seguimientoSchema = require('../models/seguimiento')
const router = express.Router();

// Crear un estado de máquina
router.post('/seguimiento', (req, res) => {
    const seguimiento = new seguimientoSchema(req.body);
    seguimiento
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todos los estados de máquina
router.get('/seguimiento', (req, res) => {
    seguimientoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener un estado de máquina por ID
router.get('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    seguimientoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un estado de máquina por ID
router.put('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    const { estado, rotor, temperatura, temperatura_s1, temperatura_s2, temperatura_promedio, fecha, maquina, operarios, lote_cafe } = req.body;
    seguimientoSchema
    .updateOne({_id:id}, {$set:{ estado, rotor, temperatura, temperatura_s1, temperatura_s2, temperatura_promedio, fecha, maquina, operarios, lote_cafe }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Borrar un estado de máquina por ID
router.delete('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    seguimientoSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
