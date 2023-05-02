const {Schema, model} = require("mongoose")



const Pedido = new Schema({

    Restaurante:{
        type: Schema.Types.ObjectId, ref: 'restaurantes',
        required: true
    },
    Usuario:{
        type: Schema.Types.ObjectId, ref: 'Usuarios' ,
        required: true
    },  
    Estado:{
        type : String, Enum: ['Creado', "Enviado", 'Aceptado', 'Recibido', 'En dirección', 'Realizado'],
        required: true
    }
},
{ timestamps: true }
)


module.exports = model ("Pedidos", Pedido);