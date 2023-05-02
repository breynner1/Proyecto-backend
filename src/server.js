const express = require ('express')
const path = require ('path')
const morgan = require ('morgan')
//inicializacion 
const app = express()

// ajustes

app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))

// middlewares

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

// variables globales

// routes
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use(require('./rutas/Usuarios.routes'))
app.use(require('./rutas/Restaurante.routes'))
app.use(require('./rutas/Producto.routes'))

// static files

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app