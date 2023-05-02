const {Schema, model} = require("mongoose")



const CategoriaR = new Schema({

    Nombre:{
        Type: string,
        required: true
    },
    Restaurante:{
        Type: int,
        required: true
    }
})


module.exports = model ("CategoriaR", CategoriaR);