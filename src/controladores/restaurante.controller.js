const RestauranteController = {}
const restaurante = require('../modelos/restau/restaurantes')
const Usuario = require('../modelos/user/Usuario')

RestauranteController.restauranteResgister = async (req, res) => {

    try {

    const { Nombre, Categoria, user } = req.body;
    
    const UsuCreador = await Usuario.findOne({_id: user})

    if (UsuCreador) {
    if(UsuCreador.tipousu == "Administrador"){
        const X = UsuCreador.direccion 
        const nuevoRestaurante = new restaurante ({ Nombre, Categoria, Popularidad:0, Direccion:X, dueño: UsuCreador });
        await nuevoRestaurante.save()
        res.send(nuevoRestaurante);
    }else {
    res.status(500).send({message: 'El usuario no es administrador'})
    }

    
    } else {
        res.status(500).send({message: 'El usuario no existe'})
    
    }

    } catch (err) {

    console.error(err);
    res.status(500).json(err);
   } 
    
}

RestauranteController.RestBuscarT = async (req, res) => {
    try{
    const restaurantes = await restaurante.find() 
    res.json(restaurantes)
    } catch (err) {
    res.status(500).json(err);
    }

    }

    RestauranteController.restauranteBuscar = async (req, res) => {
        try{
        const restaurantes = await restaurante.findOne({_id: req.params.id});
        res.json(restaurantes)
        } catch (err) {
        res.status(500).json(err);
        }

    }
    
    RestauranteController.restauranteBorrar = async (req, res) => {
        try{

            const restaurant = await restaurante.findOne({_id: req.params.id});
            
            if(restaurant){
                await restaurante.findByIdAndDelete(restaurant._id)
                res.json(restaurant)
            }else{
                res.json("restaurante no encontrado")
            }
        
            console.log(restaurant);
            } catch (err) {
              res.status(500).json(err);
            }

    }


    RestauranteController.restauranteActualizar = async (req, res) => {
        console.log(req.params.id);
    try{

    const restaurant = await restaurante.findOne({_id: req.params.id});
    

    if(restaurant){
        const {  Nombre, Categoria, Direccion, user} = req.body;

        //comprobar que sea el dueño del restaurante 

        if(restaurant.dueño._id != user){
            res.json("no eres el dueño del restaurante")
        }else{
            await restaurante.findByIdAndUpdate(restaurant._id,{Nombre, Categoria, Direccion})
            res.json(restaurante)
        }


    }else{
        res.json("restaurante no encontrado")
    }

    } catch (err) {
      res.status(500).json(err);
    }

    }

    RestauranteController.restauranteBuscarCat = async (req, res) => {
        try{
        const {Nombre, Categoria} = req.body

        const restaurantes = await restaurante.find() 

        if(Nombre == null && Categoria == null){
            res.json(restaurantes)
        }else if(Nombre == null && Categoria != null){
            const restaurantes = await restaurante.find({Categoria: Categoria}).sort({Popularidad:-1})
            res.json(restaurantes)
        }else if(Categoria == null && Nombre != null){
            const restaurantes = await restaurante.find({Nombre: Nombre}).sort({Popularidad:-1})
            
            res.json(restaurantes)
        }else{
            const restaurantes = await restaurante.find({Categoria: Categoria,Nombre: Nombre}).sort({Popularidad:-1})
            console.log(restaurantes);
            res.json(restaurantes)
        }

        } catch (err) {
        res.status(500).json(err);
        }

    }


module.exports = RestauranteController