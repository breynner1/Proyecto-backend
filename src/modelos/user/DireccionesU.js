const {Schema, model} = require("mongoose")



const Direccion = new Schema({
    Direccion:{
        Type: string,
        required: true
    },
    Usuario:{
        Type: int,
        required: true
    }
})


module.exports = model ("DireccionUsu", Direccion);