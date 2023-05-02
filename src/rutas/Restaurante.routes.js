const { Router } = require("express")
const router = Router()

const {restauranteResgister,
    restauranteBuscar,
    RestBuscarT,
    restauranteBorrar,
    restauranteActualizar,
    restauranteBuscarCat} = require('../controladores/restaurante.controller')

router.post('/restaurante/registro', restauranteResgister)

router.get('/restaurante/Buscar/:id',restauranteBuscar)

router.get('/restaurante/BuscarT',RestBuscarT)

router.delete('/restaurante/borrar/:id', restauranteBorrar)

router.patch('/restaurante/actualizar/:id', restauranteActualizar)

router.get('/restaurante/BuscarC/:Categoria', restauranteBuscarCat)


module.exports = router