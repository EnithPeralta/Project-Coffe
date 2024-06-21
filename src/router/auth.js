// importando librerias
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// rutas de la aplicacion
const authRouter = express.Router();
// modelos
const Usuario = require("../models/usuarios");


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
        
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'your_jwt_secret',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ user, token });
            }
        );

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