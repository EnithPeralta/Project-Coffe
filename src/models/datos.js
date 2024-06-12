const { required, date } = require("joi");
const mongoose  = require("mongoose");

const datoSchema=mongoose.Schema({
    temperatura:{
        type:String,
        required:true
    },
    temperatura_s1:{
        type:String,
        required:true
    },
    temperatura_s2:{
        type:String,
        required:true
    },
    temperaturaPromedio:{
        type:String,
        required:true
    },
    idMaquina:{
        type:String,
        required:true
    },
    fecha:{
        type:Date,
        required:true
    },
    
})
module.exports = mongoose.model("Datos",datoSchema)