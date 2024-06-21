// importando librerias
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// rutas de la aplicacion
const authRouter = express.Router();
// modelos
const Usuario = require("../models/usuarios");
// importar modelo jwt
const createAccesToken = require('../utils/jwt.js');


// registro de la aplicacion
authRouter.post('/register', async (req, res) => {
    const { username, email, password, cedula, nombreCompleto, telefono, direccion, estado, foto, tipoUsuario } = req.body;
    try {
        let user = await Usuario.findOne({ email });
        user && res.status(400).json({ msg: 'El usuario ya existe!' });

        user = new Usuario({
            username,
            email,
            password,
            cedula,
            nombreCompleto,
            telefono,
            direccion,
            estado,
            foto,
            tipoUsuario
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();

        const token = await createAccesToken({id:user._id});
        res.cookie("token", token);
        res.status(200).json({username, email, cedula, nombreCompleto, telefono, direccion, estado, foto, tipoUsuario});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
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
        
        // generar token y cookie
        const token = await createAccesToken({ id: user._id, rol: user.tipoUsuario });
        
        res.cookie("token", token);
        res.status(200).json(user);

    } catch (error) {
        console.log('Error al ingresar a la aplicacion!');
        console.log(error);
        res.status(500).json(error);
    }
})

// salir de la aplicacion
authRouter.post('/logout', (req, res) => {

    try {
        
        res.cookie("token", "", {
            expires: new Date(0)
        });
        res.status(200).json({message: "Sesion cerrada exitosamente!"});

    } catch (error) {
        console.log(`Error al cerrar la sesion: ${error.message}`);
        console.log(error);
        res.status(500).json(`Error al cerrar la sesion: ${error.message}`);
    }

})


module.exports = authRouter;