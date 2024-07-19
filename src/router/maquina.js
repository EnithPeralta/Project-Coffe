const express = require("express");
const maquinaSchema = require("../models/maquina");
const routes = express.Router();
import { getAllMaquinas,createMaquina } from "../controller/maquina.controller.js";

// Create máquina

routes.post('/createMaquina',createMaquina);
routes.get('/getAllMaquinas',getAllMaquinas)


// routes.get('/maquinas', (req, res) => {
//     maquinaSchema
//     .find()
//     .then((data) => res.json(data))
//     .catch((error) => res.status(400).json({ message: error.message }));
// });

// Get a máquina by ID

routes.get('/maquinas/:id', async (req, res) => {
  const { id } = req.params;  
  try {     
      const maquina = await maquinaSchema.findById(id);
      res.json(maquina);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// routes.get('/maquinas/:id', (req, res) => {
//     const { id } = req.params;
//     maquinaSchema
//     .findById(id)
//     .then((data) => res.json(data))
//     .catch((error) => res.status(400).json({ message: error.message }));
// });

// Update a máquina by ID

routes.put('/maquinas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre,estado } = req.body;
  try {
    const updatedMaquina = await maquinaSchema.updateOne({ _id: id }, { $set: { nombre,estado } });
    res.json(updatedMaquina);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




// routes.put('/maquinas/:id', (req, res) => {
//     const { id } = req.params;
//     const { nombre } = req.body;
//     maquinaSchema
//     .updateOne({_id:id},{$set:{nombre}})
//     .then((data) => res.json(data))
//     .catch((error) => res.status(400).json({ message: error.message }));
// });

// Delete a máquina by ID
routes.delete('/maquinas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await maquinaSchema.findByIdAndDelete(id);
    res.json({ message: 'Máquina eliminada correctamente.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// routes.delete('/maquinas/:id', (req, res) => {
//     const { id } = req.params;
//     const { nombre } = req.body;
//     maquinaSchema
//     .deleteOne({_id:id},{$set:{nombre}})
//     .then(() => res.json({ message: 'Máquina eliminada correctamente.' }))
//     .catch((error) => res.status(400).json({ message: error.message }));
// });

module.exports = routes;