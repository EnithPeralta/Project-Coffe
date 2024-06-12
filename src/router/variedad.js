const express = require("express")
const variedadSchema = require("../models/variedad")
const routes = express.Router()

// create variedad
routes.post('/variedad', (req, res) => {
    const variedad = variedadSchema(req.body)
    variedad
    .save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// get all variedad
routes.get('/variedad', (req, res) => {
    variedadSchema
    .find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// get a variedad
routes.get('/variedad/:id', (req, res) => {
    const {id} = req.params;
    variedadSchema
    .findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// uptade a variedad
routes.put('/variedad/:id',(req,res)=>{
    const {id} = req.params;
    const {nombre} = req.body;
    variedadSchema
    .updateOne({_id:id},{$set:{nombre}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})

// delete a variedad
routes.delete('/variedad/:id',(req,res)=>{
    const {id} = req.params;
    variedadSchema
    .deleteOne({_id:id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error}))
})
module.exports = routes