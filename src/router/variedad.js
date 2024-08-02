import express from "express";
import { Variedades } from "../models/variedad.js";

const variedadesRouter = express.Router()

// create variedad
variedadesRouter.post('/variedad', (req, res) => {
    const variedad = Variedades(req.body)
    variedad
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// get all variedad
variedadesRouter.get('/variedad', (req, res) => {
    Variedades
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// get a variedad
variedadesRouter.get('/variedad/:id', (req, res) => {
    const {id} = req.params;
    Variedades
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// uptade a variedad
variedadesRouter.put('/variedad/:id',(req,res)=>{
    const {id} = req.params;
    const {nombre} = req.body;
    Variedades
    .updateOne({_id:id},{$set:{nombre}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// delete a variedad
variedadesRouter.delete('/variedad/:id',(req,res)=>{
    const {id} = req.params;
    Variedades
    .deleteOne({_id:id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

export default variedadesRouter;