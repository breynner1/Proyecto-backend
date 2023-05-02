const {Schema, model} = require("mongoose")


const Restaurante = new Schema({

    Nombre:{
        type: String,   
        required: true
    },
    Categoria:{
        type: String,
        required: true
    },
    Popularidad:{
        type: Number,
        required: true
    },
    Direccion:{
        type: String,
        required: true
    },
    dueño:{
        type: Schema.Types.ObjectId, ref: 'Usuarios' ,
        required: true
    }
},
{ timestamps: true }
)


module.exports = model ("restaurantes", Restaurante);