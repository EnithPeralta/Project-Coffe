const express = require("express");
const maquinaSchema = require("../models/maquina");
const routes = express.Router();

// Create máquina
routes.post('/maquinas', (req, res) => {
    const maquina = maquinaSchema(req.body);
    maquina.save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Get all máquinas
routes.get('/maquinas', (req, res) => {
    maquinaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Get a máquina by ID
routes.get('/maquinas/:id', (req, res) => {
    const { id } = req.params;
    maquinaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Update a máquina by ID
routes.put('/maquinas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    maquinaSchema
    .updateOne({_id:id},{$set:{nombre}})
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Delete a máquina by ID
routes.delete('/maquinas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    maquinaSchema
    .deleteOne({_id:id},{$set:{nombre}})
    .then(() => res.json({ message: 'Máquina eliminada correctamente.' }))
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = routes;