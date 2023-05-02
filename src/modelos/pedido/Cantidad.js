const {Schema, model} = require("mongoose")



const Cantidad = new Schema({

    Producto:{
        Type: int,
        required: true
    },
    Cantidad:{
        Type: int,
        required: true
    },
    Pedido:{
        Type: int,
        required: true
    }
})



module.exports = model ("Cantidad", Cantidad);