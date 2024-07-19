const express = require("express");
const maquinaSchema = require("../models/maquina");
const routes = express.Router();

// Create máquina

routes.post('/maquinas', async (req, res) => {
    const{
      id,
      nombre,
      estado
    }=req.body
    try {
    const maquina = await new maquinaSchema({
      id,
      nombre,
      estado
    }); 
    const savedMaquina = await maquina.save();
    res.status(200).json({message:'maquina creda correctamente',maquina:savedMaquina})
    } catch (error) {
    res.status(400).json({ message:'error al crear la maquina',error: error.message });
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