const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadMiddleware = require('../utils/handleStorage');
const Usuario = require('../models/usuarios');
const storageSchema = require('../models/storage');
const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:8000';





// Ruta para registrar usuario
authRouter.post('/register', uploadMiddleware.single("foto"), async (req, res) => {
    const { body, file } = req;
    let fotoId; // Variable para almacenar el ID de la foto

    try {
        if (!file) {
            // Si no se sube una foto, utilizar la foto por defecto
            const fileData = {
                url: `${PUBLIC_URL}/usuario-undefined.png`, //url definida en controlador storage
                filename: 'usuario-undefined.png' 
            };

            // Buscar o guardar la foto por defecto en la colección storage
            let fileSaved = await storageSchema.findOne({ filename: 'usuario-undefined.png' });
            if (!fileSaved) {
                fileSaved = await storageSchema.create(fileData);
            }
            fotoId = fileSaved._id; 
        } else {
            const fileData = {
                url: `${PUBLIC_URL}/${file.filename}`,
                filename: file.filename
            };

            // Guardar el archivo en la colección storage
            const fileSaved = await storageSchema.create(fileData);
            fotoId = fileSaved._id; 
        }

        // Crear usuario vinculando id foto
        const userData = {
            ...body,
            foto: fotoId 
        };

        // Verificar si el usuario ya existe
        let user = await Usuario.findOne({ email: userData.email });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe!' });
        }

        // Crear el usuario con la contraseña encriptada
        user = new Usuario(userData);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(userData.password, salt);

        await user.save();

        // Crear payload y generar el token JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '2h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ message: "Usuario creado exitosamente", user, token });
            }
        );

    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
});




// para el ingreso a la aplicacion
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Usuario.findOne({ email });
        !user && res.status(400).json({ message: 'Contraseña o usuario incorrectos.' });

        const comparePassword = await bcrypt.compare(password, user.password);
        comparePassword === false && res.status(400).json({message: 'Contraseña o usuario incorrectos.'});
        
        // generar token
        const token = jwt.sign(user.toObject(), 'your_jwt_secret', { expiresIn: "1h" });
        res.status(200).json({user, comparePassword, token});

    } catch (error) {
        console.log('Error al ingresar a la aplicacion!');
        console.log(error);
        res.json(error);
    }
})


module.exports = authRouter;