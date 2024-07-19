const mongoose = require("mongoose")
const maquinaSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        require:true,
        enum:['Activo','Inactivo','En Mantenimiento']
    }
})
module.exports = mongoose.model('Maquina', maquinaSchema)