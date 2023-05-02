const { Router } = require("express")
const router = Router()

const {PedidoResgister,
    PedidoBuscar} = require('../controladores/pedidos.controller')
const {PedidoBuscarT} = require('../controladores/p.controller')

router.post('/Pedido/registro', PedidoBuscarT)

router.get('/Producto/Buscar/:id',PedidoBuscar)

// router.get('/Producto/BuscarT',ProductoBuscarT)

// router.delete('/Producto/borrar/:id', ProductoBorrar)

// router.patch('/Producto/actualizar/:id', ProductoActualizar)

// router.get('/Producto/BuscarC/', ProductoBuscarCat)


module.exports = router