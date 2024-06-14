// importando librerias
const express = require('express');
// importar modelos
const Usuario = require('../models/usuarios.js');


// rutas de la aplicacion
const router = express.Router();


router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await usuario.findOne({ email });
        
        res.json(user);

    } catch (error) {
        console.log('Error al ingresar a la aplicacion!');
        console.log(error);
        res.status(400).json(error);
    }
})




module.exports = router;