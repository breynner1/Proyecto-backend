const {Schema, model} = require("mongoose")



const UsuarioE = new Schema({

    nombre:{
        type: String,
        required: true
    },
    celular:{
        type: Number,
        required: true,
        minlength: 10
    }, 
    correo:{
        type: String,
        required: true
    },
    contrasena:{
        type: String,
        required: true
    },   
    direccion:{
        type: String,
        required: true
    },
    activo:{
        type: Boolean,
        default: true
    },
    tipousu:{
        type : String, Enum: ['Cliente', "Domiciliario", 'Administrador'],
        required: true
    }
},
{ timestamps: true }
)

module.exports = model ("Usuarios", UsuarioE);
