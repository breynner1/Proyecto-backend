const ProductoController = {}
const Restaurante = require('../modelos/restau/restaurantes')
const Producto = require('../modelos/restau/productos')
const Usuario = require('../modelos/user/Usuario')

ProductoController.ProductoResgister = async (req, res) => {

    try {

    const { Nombre, Precio, Descripción, CategoriaR, restaurante } = req.body;

    const restCreador = await Restaurante.findOne({_id: restaurante}) 
    if(!restCreador){
        res.status(500).send({message: 'El restaurante no existe'})
    } else {
        const nuevoProducto = new Producto ({ Nombre, Precio, Descripción, CategoriaR, Restaurante:restaurante });
        await nuevoProducto.save()
        res.send(nuevoProducto);
    }
    

    } catch (err) {

    console.error(err);
    res.status(500).json(err);
    }

}

ProductoController.ProductoBuscarT = async (req, res) => {
    try{
    const productos = await Producto.find() 
    const productosPorCategoria = {};

    productos.forEach((producto) => {
    if (!productosPorCategoria[producto.CategoriaR]) {
    productosPorCategoria[producto.CategoriaR] = [];
    }
    productosPorCategoria[producto.CategoriaR].push(producto);
    });

    res.json(productosPorCategoria);
    } catch (err) {
    res.status(500).json(err);
    }

    }

ProductoController.ProductoBuscar = async (req, res) => {
        try{
        const producto = await Producto.findOne({_id: req.params.id});
        if(producto){
        res.json(producto)
        } else {
            res.status(500).send({message: 'El producto no existe'})
        }
        } catch (err) {
        res.status(500).json(err);
        }

    }    

ProductoController.ProductoBorrar = async (req, res) => {
        try{

            const producto = await Producto.findOne({_id: req.params.id});
            
            if(producto){
                await Producto.findByIdAndDelete(producto._id)
                res.json(restaurant)
            }else{
                res.json("producto no encontrado")
            }
        
            } catch (err) {
              res.status(500).json(err);
            }

    }

ProductoController.ProductoActualizar = async (req, res) => {
        console.log(req.params.id);
    try{

    const { Nombre, Precio, Descripción, CategoriaR, usuario } = req.body;
    const producto = await Producto.findOne({_id: req.params.id});
    const restaurant = await Restaurante.findOne({_id: producto.Restaurante});
    const user = await Usuario.findOne({_id: restaurant.dueño});
    if(producto){

        //comprobar que sea el dueño del restaurante 
        if(user._id != usuario){
            res.status(500).send({message: "no eres el dueño del restaurante con este producto"})
        }else{
            await Producto.findByIdAndUpdate(producto._id,{Nombre, Precio, Descripción, CategoriaR})
            console.log(producto);
            res.json(producto)
        }


    }else{
        res.json("producto no encontrado")
    }

    } catch (err) {
      res.status(500).json(err);
    }

    }    


ProductoController.ProductoBuscarCat = async (req, res) => {
        try{
        const {CategoriaR, Restaurante} = req.body

        const producto = await Producto.find() 

        if(CategoriaR == null && Restaurante == null){

            const productosPorCategoria = {};

            producto.forEach((producto) => {
            if (!productosPorCategoria[producto.CategoriaR]) {
            productosPorCategoria[producto.CategoriaR] = [];
            }
            productosPorCategoria[producto.CategoriaR].push(producto);
            });

            res.json(productosPorCategoria)

        }else if(CategoriaR == null && Restaurante != null){
            const producto = await Producto.find({Restaurante:Restaurante})

            const productosPorCategoria = {};
            producto.forEach((producto) => {
                if (!productosPorCategoria[producto.CategoriaR]) {
                productosPorCategoria[producto.CategoriaR] = [];
                }
                productosPorCategoria[producto.CategoriaR].push(producto);
                });
    

            res.json(productosPorCategoria)
        }else if(Restaurante == null && CategoriaR!= null){
            const producto = await Producto.find({CategoriaR:CategoriaR})

            const productosPorCategoria = {};
            producto.forEach((producto) => {
                if (!productosPorCategoria[producto.CategoriaR]) {
                productosPorCategoria[producto.CategoriaR] = [];
                }
                productosPorCategoria[producto.CategoriaR].push(producto);
                });
            
            res.json(productosPorCategoria)
        }else{
            const producto = await Producto.find({CategoriaR,Restaurante})

            const productosPorCategoria = {};
            producto.forEach((producto) => {
                if (!productosPorCategoria[producto.CategoriaR]) {
                productosPorCategoria[producto.CategoriaR] = [];
                }
                productosPorCategoria[producto.CategoriaR].push(producto);
                });
            
            res.json(productosPorCategoria)
        }

        } catch (err) {
        res.status(500).json(err);
        }

    }


module.exports = ProductoController