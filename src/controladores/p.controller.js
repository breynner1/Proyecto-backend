const PController = {}
const Restaurante = require('../modelos/restau/restaurantes')


PController.PedidoBuscarT = async (req, res) => {
    const { restaurante, usuario } = req.body;

    const restCreador = await Restaurante.findOne ({_id: usuario});
    console.log(restCreador)
    res.send(restCreador)
}

module.exports = PController