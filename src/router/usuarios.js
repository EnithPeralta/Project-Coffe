const express = require("express")
const usuarioSchema = require("../models/usuarios")
const routes = express.Router();
const Joi = require('joi')


const usuarioValidationSchema = Joi.object({
    cedula: Joi.string().required(),
    nombreCompleto: Joi.string().required(),
    telefono: Joi.number().required(),
    direccion: Joi.string().required(),
    email: Joi.string().email().required(),
    estado: Joi.boolean().required(),
    foto: Joi.string().required(),
    tipoUsuario: Joi.string().valid('Administrador', 'Operario', 'Proveedor').required()
});

const validateUsuario = (req, res, next) => {
    const { error } = usuarioValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


// Ruta para crear usuario
routes.post('/usuarios', validateUsuario, (req, res) => {
    const usuario = usuarioSchema(req.body)
    usuario
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
});

// Ruta para obtener todos los usuarios
routes.get('/usuarios', (req, res) => {
    usuarioSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
});

// Ruta para obtener un usuario por su ID
routes.get('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    usuarioSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
});

// Ruta para actualizar un usuario por su ID
routes.put('/usuarios/:id', validateUsuario, (req, res) => {
    const {id} = req.params;
    const {cedula, nombreCompleto,telefono,direccion,email,estado,foto,tipoUsuario} = req.body;
    usuarioSchema
    .updateOne({_id:id},{ $set:{cedula, nombreCompleto,telefono,direccion,email,estado,foto,tipoUsuario}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
});

// Ruta para eliminar un usuario por su ID
routes.delete('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    usuarioSchema
    .deleteOne({_id:id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
});

module.exports = routes;