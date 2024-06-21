const mongoose  = require("mongoose");
const loteCafeSchema = mongoose.Schema({
    peso:{
        type:Number,
        required:true
    },
    usuarios:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Usuario'
    },
    tipoProcesos:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'TiposProcesos'
    },
    variedad:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Variedades'

    }
})
module.exports = mongoose.model('Lotes',loteCafeSchema)