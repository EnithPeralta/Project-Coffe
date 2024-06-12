const mongoose  = require("mongoose");
const loteCafe = require("./loteCafe");
const seguimientoSchema = mongoose.Schema({
    fecha:{
        type:Date,
        required:true
    },
    estado:{
        type:String,
        require:true,
        enum:['Operando','Fuera de servicio','Mantenimiento']
    },
    maquina:{
        type:String,
        required:true
    },
    loteCafe:{
        type:String,
        required:true
    },
    usuarios:{
        type:String,
        required:true
    },
    idProceso:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('Seguimiento',seguimientoSchema)