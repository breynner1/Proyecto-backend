const {Schema, model} = require("mongoose")


const Producto = new Schema({

    Nombre:{
        type: String,
        required: true
    },
    CategoriaR:{
        type: String,
        required: true
    },
    Restaurante:{
        type: Schema.Types.ObjectId, ref: 'restaurantes',
        required: true
    },
    Descripción:{
        type: String,
        required: true
    },
    Precio:{
        type: Number,
        required: true
    }
},
{ timestamps: true }
)


module.exports = model ("Producto", Producto);
