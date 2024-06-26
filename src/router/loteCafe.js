const express = require("express");
const loteCafeSchema = require("../models/loteCafe");
const router = express.Router();
const usuarioModel= require('../models/usuarios');
const tipoProcesosModel=require('../models/tipoProceso');
const variedadModel=require('../models/variedad');

// Crear un lote de café
router.post('/loteCafe', async (req, res)=>{
    try{
        const { usuarios, tipoProcesos, variedad } = req.body
        const usuario= await usuarioModel.findById(usuarios)
        const tipoProceso= await tipoProcesosModel.findById(tipoProcesos)
        const variedades= await variedadModel.findById(variedad)

        if (!usuario || !tipoProceso || !variedades) {
            res.status(400).json({message:"el usuario,tipo proceso y variedad no existe"})
        }

        
        const loteCafe= await loteCafeSchema.create(req.body)
        res.status(400).json(loteCafe);
    }catch(error){
        res.status(400).json({message:error.message})
    }

});

// Obtener todos los lotes de café
router.get('/loteCafe', async (req, res) => {
    try {
    const data = await loteCafeSchema.find()
    .populate('tipoProcesos')
    .populate('variedad')
    .populate('usuarios');
    res.json(data);
    } catch (error) {
      res.json({ message: error.message });
    }
});  

// Obtener un lote de café por ID
router.get('/loteCafe/:id', (req, res) => {
    const { id } = req.params;
    loteCafeSchema
    .findById(id)
    .populate('tipoProcesos')
    .populate('variedad')
    .populate('usuarios')
    
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un lote de café por ID
router.put('/loteCafe/:id', (req, res) => {
    const { id } = req.params;
    const { peso, proveedores, tiposProcesos, variedad } = req.body;
    loteCafeSchema
    .updateOne({_id:id},{$set:{ peso, proveedores, tiposProcesos, variedad }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Borrar un lote de café por ID
router.delete('/loteCafe/:id', (req, res) => {
    const { id } = req.params;
    loteCafeSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;