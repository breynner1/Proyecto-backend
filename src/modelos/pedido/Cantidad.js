const {Schema, model} = require("mongoose")



const Cantidad = new Schema({

    Producto:{
        type: Schema.Types.ObjectId, ref: 'Producto',
        required: true
    },
    Cantidad:{
        type: Number,
        required: true
    },
    Pedido:{
        type: Schema.Types.ObjectId, ref: 'Pedidos',
        required: true
    }
})



module.exports = model ("Cantidad", Cantidad);