const {Schema, model} = require("mongoose")



const Estado = new Schema({

    Estado:{
        Type: string,
        required: true
    }
})


module.exports = model ("Estado", Estado);
