const express = require("express");
const loteCafeSchema = require("../models/loteCafe");
const router = express.Router();

// Crear un lote de café
router.post('/loteCafe', (req, res) => {
    const lote = new loteCafeSchema(req.body);
    lote
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todos los lotes de café
router.get('/loteCafe', (req, res) => {
    loteCafeSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener un lote de café por ID
router.get('/loteCafe/:id', (req, res) => {
    const { id } = req.params;
    loteCafeSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un lote de café por ID
router.put('/loteCafe/:id', (req, res) => {
    const { id } = req.params;
    const { peso, proveedores, tiposProcesos, variedad } = req.body;
    loteCafeSchema
    .updateOne({_id:id},{$set:{ peso, proveedores, tiposProcesos, variedad }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Borrar un lote de café por ID
router.delete('/loteCafe/:id', (req, res) => {
    const { id } = req.params;
    loteCafeSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;