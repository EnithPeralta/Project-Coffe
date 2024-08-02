import express from 'express';
import { Seguimiento } from '../models/seguimiento.js';
import { Maquina } from '../models/maquina.js';
import { Lotes } from '../models/loteCafe.js';
import { Usuario } from '../models/usuarios.js';
import { TiposProcesos } from '../models/tipoProceso.js';
const seguimientoRouter = express.Router();

// Crear un estado de máquina
seguimientoRouter.post('/seguimiento', async (req, res) => { 
    try {
        const { maquina, loteCafe, usuarios, TipoProceso } = req.body;


        const maquinas = await Maquina.findById(maquina);
        const loteCafee = await Lotes.findById(loteCafe);
        const usuarioss = await Usuario.findById(usuarios);
        const tipoProceso = await TiposProcesos.findById(TipoProceso);
        if (!maquinas || !loteCafee || !usuarioss || !tipoProceso) {
            return res.status(400).json({ message: "La maquina, lote de cafe y/o usuarios no existen" });
        }

        const seguimiento = await Seguimiento.create(req.body);
        res.status(200).json(seguimiento); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todos los estados de máquina
seguimientoRouter.get('/seguimiento', async (req, res) => {
    try {
        const data = await Seguimiento.find()
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
seguimientoRouter.get('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    Seguimiento
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un estado de máquina por ID
seguimientoRouter.put('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    const { estado, rotor, temperatura, temperatura_s1, temperatura_s2, temperatura_promedio, fecha, maquina, operarios, lote_cafe } = req.body;
    Seguimiento
    .updateOne({_id:id}, {$set:{ estado, rotor, temperatura, temperatura_s1, temperatura_s2, temperatura_promedio, fecha, maquina, operarios, lote_cafe }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Borrar un estado de máquina por ID
seguimientoRouter.delete('/seguimiento/:id', (req, res) => {
    const { id } = req.params;
    Seguimiento
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

export default seguimientoRouter;
