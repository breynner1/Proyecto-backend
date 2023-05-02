const {Schema, model} = require("mongoose")




const Pedido = new Schema({

    Restaurante:{
        Type: int,
        required: true
    },
    Usuario:{
        Type: int,
        required: true
    },
    Fecha:{
        Type: Date,
        required: true
    },  
    Estado:{
        Type: int,
        required: true
    }
})


module.exports = model ("Pedido", Pedido);