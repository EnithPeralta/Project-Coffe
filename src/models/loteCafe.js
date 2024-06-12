const mongoose  = require("mongoose");
const usuarios = require("./usuarios");
const tipoProceso = require("./tipoProceso");
const variedad = require("./variedad");
const loteCafeSchema = mongoose.Schema({
    peso:{
        type:String,
        required:true
    },
    usuarios:{
        type:String,
        required:true
    },
    tipoProcesos:{
        type:String,
        required:true
    },
    variedad:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Lotes',loteCafeSchema)