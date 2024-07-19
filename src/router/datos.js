const express = require("express");
const Joi = require("joi");
const DatoSchema = require("../models/datos");
const routes = express.Router();

// Esquema de validación para crear y actualizar datos
const datosValidationSchema = Joi.object({
    temperatura: Joi.string().required(),
    temperatura_s1: Joi.string().required(),
    temperatura_s2: Joi.string().required(),
    temperaturaPromedio: Joi.string().required(),
    idMaquina: Joi.string().required(),
    fecha: Joi.date().required(),
    seguimiento: Joi.number().required(), 
    //
});

// Middleware para validar los datos
const validateDatos = (req, res, next) => {
    const { error } = req.body;
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Ruta para crear dato
routes.post('/datos', validateDatos, async (req, res) => {
    const{
        temperatura,
        temperatura_s1,
        temperatura_s2,
        temperaturaPromedio,
        idMaquina,
        fecha,
        seguimiento,
    }=req.body;
    try {
      const nuevoDato = new DatoSchema({
        temperatura,
        temperatura_s1,
        temperatura_s2,
        temperaturaPromedio,
        idMaquina,
        fecha,
        seguimiento,
      }); // Use 'new' for instance creation
      const savedDato = await nuevoDato.save();
      res.status(200).json({message: 'Dato creado correctamente', nuevoDato:savedDato});
    } catch (error) {
      res.status(400).json({ message:'Error al crear el dato',error: error.message });
    }
  });
  
// routes.post('/datos', validateDatos, (req, res) => {
//     const dato = datoSchema(req.body);
//     dato
//     .save()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// Ruta para obtener todos los datos
routes.get('/datos', async (req, res) => {
    try {
      const datos = await datoSchema.find();
      res.json(datos);
    } catch (error) {
      res.json({ message: error.message });
    }
  });
  
// routes.get('/datos', (req, res) => {
//     datoSchema
//     .find()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// Ruta para obtener un dato por su ID
routes.get('/datos/:id', (req, res) => {
    const { id } = req.params;
    datoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Ruta para actualizar un dato por su ID
routes.put('/datos/:id', validateDatos, (req, res) => {
    const { id } = req.params;
    const { temperatura, temperatura_s1, temperatura_s2, temperaturaPromedio, idMaquina, fecha } = req.body;
    datoSchema
    .updateOne({ _id: id }, { $set: { temperatura, temperatura_s1, temperatura_s2, temperaturaPromedio, idMaquina, fecha } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Ruta para eliminar un dato por su ID
routes.delete('/datos/:id', (req, res) => {
    const { id } = req.params;
    datoSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = routes;
