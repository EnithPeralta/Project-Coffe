const mongoose  = require("mongoose");
const { required } = require("joi");
const seguimientoSchema = mongoose.Schema({
    fecha:{
        type:Date,
        required:true
    },
    estado:{
        type:String,
        required:true,
        enum:['Operando','Fuera de servicio','Mantenimiento']
    },
    maquina:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Maquina'
    },
    loteCafe:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Lotes'
    },
    usuarios:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Usuario'
    },
    idProceso:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Seguimiento',seguimientoSchema)