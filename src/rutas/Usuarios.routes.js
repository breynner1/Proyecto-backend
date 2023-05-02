const { Router } = require("express")
const router = Router()

const {UserLogin,
    UserResgister,
    UserBuscar,
    UserBuscarT,
    UserBorrar,
    UserActualizar} = require('../controladores/usuario.controller')

router.post('/usuarios/registro', UserResgister)

router.get('/usuarios/login', UserLogin)

router.get('/usuarios/Buscar/:id',UserBuscar)

router.get('/usuarios/BuscarT',UserBuscarT)

router.delete('/usuarios/borrar/:id',UserBorrar)

router.patch('/usuarios/actualizar/:id',UserActualizar)


module.exports = router