const express = require("express");
const maquinaSchema = require("../models/maquina");
const routes = express.Router();

// Create máquina

routes.post('/maquinas', async (req, res) => {
    try {
    const maquina = new maquinaSchema(req.body); 
    const savedMaquina = await maquina.save();
    res.json(savedMaquina);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
});


// routes.post('/maquinas', (req, res) => {
//     const maquina = maquinaSchema(req.body);
//     maquina.save()
//         .then((data) => res.json(data))
//         .catch((error) => res.status(400).json({ message: error.message }));
// });

// Get all máquinas

routes.get('/maquinas', async (req, res) => {
    try {
      const maquinas = await maquinaSchema.find();
      res.json(maquinas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }); 


// routes.get('/maquinas', (req, res) => {
//     maquinaSchema
//     .find()
//     .then((data) => res.json(data))
//     .catch((error) => res.status(400).json({ message: error.message }));
// });

// Get a máquina by ID

routes.get('/maquinas/:id', async (req, res) => {
    try {
      const { id } = req.params;
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
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const updatedMaquina = await maquinaSchema.updateOne({ _id: id }, { $set: { nombre } });
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
  try {
    const { id } = req.params;
    // No need for 'nombre' from req.body as it's not used in deleteOne
    await maquinaSchema.deleteOne({ _id: id });
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