const { Router } = require("express")
const router = Router()

const {ProductoResgister,
    ProductoBuscarT,
    ProductoBuscar,
    ProductoBorrar,
    ProductoActualizar,
    ProductoBuscarCat} = require('../controladores/producto.controller')

router.post('/Producto/registro', ProductoResgister)

router.get('/Producto/Buscar/:id',ProductoBuscar)

router.get('/Producto/BuscarT',ProductoBuscarT)

router.delete('/Producto/borrar/:id', ProductoBorrar)

router.patch('/Producto/actualizar/:id', ProductoActualizar)

router.get('/Producto/BuscarC/', ProductoBuscarCat)


module.exports = router