const { Router } = require("express")
const router = Router()

const {PedidoResgister,
    PedidoBuscar,
    PedidoBuscarT,
    AgregarPedido,
    PedidoEnviar,
    PedidoEliminar,
    EliminarArticulo,
    BuscarEntreFechasR,
    SinAceptar,
    PedidoAceptar,
    recibido,
    EnDireccion,
    Realizado,
    PedidosRestaurante} = require('../controladores/pedidos.controller')

router.post('/Pedido/registro', PedidoResgister)

router.get('/Pedido/Buscar/:id',PedidoBuscar)

router.get('/Pedido/BuscarT',PedidoBuscarT)

router.post('/Pedido/AgregarPedido', AgregarPedido)

router.patch('/Pedido/Enviar/', PedidoEnviar)

router.delete('/Pedido/EliminarP/:id', PedidoEliminar)

router.delete('/Pedido/EliminarAr/', EliminarArticulo)

router.get('/Pedido/BuscarPorFechasORestaurante/',BuscarEntreFechasR)

router.get('/Pedido/SinAceptar/:id',SinAceptar)

router.get('/Pedido/PedidoAceptar/',PedidoAceptar)

router.patch('/Pedido/Recibido/',recibido)

router.patch('/Pedido/EnDireccion/',EnDireccion)

router.patch('/Pedido/Realizado/',Realizado)

router.get('/Pedido/PedidosRestaurante/',PedidosRestaurante)

module.exports = router