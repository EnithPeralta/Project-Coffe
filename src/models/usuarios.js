const mongoose = require('mongoose');
const usuarioSchema = mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cedula:{
        type:String,
        required:true,
        unique:true
    },
    nombreCompleto:{
        type:String,
        required:true
    },
    telefono:{
        type:Number,
        required:true
    },
    direccion:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    estado:{
        type:Boolean,
        require:true
    },
    foto:{
        type: mongoose.Schema.Types.ObjectId,  // ID del documento de la colección storage donde se almacena las img
        ref: 'storage',
        required: true
    },
    tipoUsuario:{
        type:String,
        enum: ['Administrador','Operario','Proveedor'],
        require:true
    }
})
module.exports = mongoose.model('Usuario',usuarioSchema)