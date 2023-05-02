const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/Restaurante";

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Base de datos conectada'))
.catch((e) => console.log("Error en la base de datos",e))