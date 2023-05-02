const {Schema, model} = require("mongoose")



const Encargo = new Schema({

    Usuario:{
        Type: int,
        required: true
    },
    UsuarioE:{
        Type: int,
        required: true
    },
    Estado:{
        Type: Int,
        required: true
    },
    Pedido:{
        Type: int,
        required: true
    }
})


module.exports = model ("Encargo", Encargo);