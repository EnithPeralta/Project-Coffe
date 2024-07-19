const express = require("express");
const seguimientoSchema = require('../models/seguimiento');
const maquinaM = require('../models/maquina');
const loteCafeM = require('../models/loteCafe'); 
const usuariosM = require('../models/usuarios'); 
const tipoProcesos = require('../models/tipoProceso');
const router = express.Router();

// Crear un estado de máquina
router.post('/seguimiento', async (req, res) => { 
    try {
        const { maquina, loteCafe, usuarios, TipoProceso } = req.body;


        const maquinas = await maquinaM.findById(maquina);
        const loteCafee = await loteCafeM.findById(loteCafe);
        const usuarioss = await usuariosM.findById(usuarios);
        const tipoProceso = await tipoProcesos.findById(TipoProceso);
        if (!maquinas || !loteCafee || !usuarioss || !tipoProceso) {
            return res.status(400).json({ message: "La maquina, lote de cafe y/o usuarios no existen" });
        }

        const seguimiento = await seguimientoSchema.create(req.body);
        res.status(200).json(seguimiento); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todos los estados de máquina
router.get('/seguimiento', async (req, res) => {
    try {
        const data = await seguimientoSchema.find()
            .populate('maquina') 
            .populate('loteCafe') 
            .populate('usuarios')
            .populate('TipoProceso'); 
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Obtener un estado de máquina por ID
router.get('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    seguimientoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un estado de máquina por ID
router.put('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    const { estado, rotor, temperatura, temperatura_s1, temperatura_s2, temperatura_promedio, fecha, maquina, operarios, lote_cafe } = req.body;
    seguimientoSchema
    .updateOne({_id:id}, {$set:{ estado, rotor, temperatura, temperatura_s1, temperatura_s2, temperatura_promedio, fecha, maquina, operarios, lote_cafe }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Borrar un estado de máquina por ID
router.delete('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    seguimientoSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
