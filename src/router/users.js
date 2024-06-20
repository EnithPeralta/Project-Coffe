const express = require("express");
const usuarioSchema = require("../models/usuarios");
const storageSchema = require("../models/storage");
const routes = express.Router();
const Joi = require('joi');
const uploadMiddleware = require('../utils/handleStorage');
const PUBLIC_URL = process.env.PUBLIC_URL; 

const usuarioValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(), 
    cedula: Joi.string().required(),
    nombreCompleto: Joi.string().required(),
    telefono: Joi.number().required(),
    direccion: Joi.string().required(),
    email: Joi.string().email().required(),
    estado: Joi.boolean().required(),
    foto: Joi.required(),
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
routes.post('/usuarios', uploadMiddleware.single("foto"), async (req, res) => {
    const { body, file } = req;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Construir los datos del archivo para guardarlo en la colección storage
    const fileData = {
        url: `${PUBLIC_URL}/${file.filename}`,
        filename: file.filename
    };

    try {
        // Guardar el archivo en la colección storage
        const fileSaved = await storageSchema.create(fileData);

        // Crear los datos del usuario incluyendo la referencia al archivo
        const userData = {
            ...body,
            foto: fileSaved._id
        };

        // Validar el usuario
        const { error } = usuarioValidationSchema.validate(userData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Crear el usuario en la base de datos
        const usuario = new usuarioSchema(userData);
        const data = await usuario.save();

        res.status(201).json({ message: "Usuario creado exitosamente", data });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
});



// Ruta para actualizar un usuario por su ID
routes.put('/usuarios/:id', uploadMiddleware.single("foto"), async (req, res) => {
    const { id } = req.params;
    const { body, file } = req;

    let userData = { ...body };

    try {
        if (file) {
            // foto usuario, colección storage
            const fileData = {
                url: `${PUBLIC_URL}/${file.filename}`,
                filename: file.filename
            };

            // Guardar el archivo (foto) en la colección storage y vincular id al usuario
            const fileSaved = await storageSchema.create(fileData);
            userData.foto = fileSaved._id;
        }

        
        const data = await usuarioSchema.updateOne({ _id: id }, { $set: userData });

        res.json({ message: "Usuario actualizado exitosamente", userData });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});



// Ruta para obtener todos los usuarios
routes.get('/usuarios', async (req, res) => {
    try {
        const data = await usuarioSchema.find({}).populate('foto');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Ruta para obtener un usuario por su ID
routes.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await usuarioSchema.findById(id).populate('foto');
        if (!data) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un usuario por su ID
routes.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await usuarioSchema.deleteOne({ _id: id });
        if (data.deletedCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario aliminado exitosamente", data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = routes;
