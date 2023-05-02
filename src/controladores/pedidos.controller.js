const PedidoController = {}
const Restaurante = require('../modelos/restau/restaurantes')
const Producto = require('../modelos/restau/productos')
const Usuarios = require('../modelos/user/Usuario')
const Pedido = require('../modelos/pedido/pedidos')
const Cantidad = require('../modelos/pedido/Cantidad')

PedidoController.PedidoResgister = async (req, res) => {

    try {

    const { restaurante, usuario } = req.body;

    const restCreador = await Restaurante.findOne ({_id: usuario});
    console.log(restCreador)
    const usuCreador = await Usuarios.findOne({_id: usuario});
    

    if(restCreador===null || usuCreador===null){
        res.status(500).json('un dato no existe')
    }
    if(restCreador && usuCreador){
        const nuevoPedido = new Pedido ({Restaurante:restaurante,Usuario:usuario, Estado: 'Creado' });
        await nuevoPedido.save()
        res.send(nuevoPedido);
    }
    
    
    } catch (err) {

    console.error(err);
    res.status(500).json(err);
   } 
    
}

PedidoController.PedidoBuscar = async (req, res) => {
    try{
    const pedido = await Restaurante.findOne({_id: req.params.id});
    if(pedido){
    res.json(pedido)
    } else {
        res.status(500).send({message: 'El pedido no existe'})
    }
    } catch (err) {
    res.status(500).json(err);
    }

    }


module.exports = PedidoController
