const PedidoController = {};
const Restaurante = require("../modelos/restau/restaurantes");
const Producto = require("../modelos/restau/productos");
const Usuarios = require("../modelos/user/Usuario");
const Pedido = require("../modelos/pedido/pedidos");
const Cantidad = require("../modelos/pedido/Cantidad");
const pedidos = require("../modelos/pedido/pedidos");

PedidoController.PedidoResgister = async (req, res) => {
  try {
    const { restaurante, usuario } = req.body;
    console.log(restaurante);
    const restCreador = await Restaurante.findOne({ _id: restaurante });
    console.log(restCreador);
    const usuCreador = await Usuarios.findOne({ _id: usuario });

    if (restCreador === null || usuCreador === null) {

        let mensaje = "Los siguientes campos no existen :";
        if (!restCreador) {
            mensaje += " Restaurante";
        }
        if (!usuCreador) {
            mensaje += " Usuario";
        }
        res.status(400).json({ message: mensaje });
      
    }
    if (restCreador && usuCreador) {
      const nuevoPedido = new Pedido({
        Restaurante: restaurante,
        Usuario: usuario,
        Estado: "Creado",
      });
      await nuevoPedido.save();
      res.status(200).json(nuevoPedido);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

PedidoController.AgregarPedido = async (req, res) => {
  try {
    const { pedido, producto, cantidad } = req.body;

    const pedCreador = await Pedido.findOne({ _id: pedido });
    const prodCreador = await Producto.findOne({ _id: producto });

    if (pedCreador === null || prodCreador === null) {
      let mensaje = "Los siguientes campos no existen :";
      if (!pedCreador) {
        mensaje += " Pedido";
      }
      if (!prodCreador) {
        mensaje += " Producto";
      }
      res.status(400).json({ message: mensaje });
    } else {
      if (pedCreador.Estado == "Creado") {
        
        x=""+pedCreador.Restaurante;
        y=""+prodCreador.Restaurante;
        if (x == y) {
            console.log("entro");
          const nuevaCantidad = new Cantidad({
            Pedido: pedido,
            Producto: producto,
            Cantidad: cantidad,
          });
          await nuevaCantidad.save();
          res.status(200).json(nuevaCantidad);
        } else {
          res.status(500).json("El producto no pertenece al restaurante");
        }
      } else {
        res.status(500).json("El pedido ya fue enviado");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


PedidoController.PedidoBuscar = async (req, res) => {
  try {
    const pedido = await Pedido.findOne({ _id: req.params.id });
    if (pedido) {
      ariculos = await Cantidad.find({ Pedido: req.params.id,  });
      let total = 0;

      for (let i = 0; i < ariculos.length; i++) {
        // Suma los precios
        console.log(ariculos[i].Producto);
        let valor = await Producto.findOne({ _id: ariculos[i].Producto });
        let n = valor.Precio * ariculos[i].Cantidad;
        total += n;
      }
      console.log(total);
      res.json({ pedido, ariculos, total});
    } else {
      res.status(500).send({ message: "El pedido no existe" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

PedidoController.PedidoBuscarT = async (req, res) => {
  try {
    const pedido = await Pedido.find();
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(500).send({ message: "El pedido no existe" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

PedidoController.PedidoEliminar = async (req, res) => {

    try {
        const pedido = await Pedido.findOne({ _id: req.params.id });
        if (pedido) {
            await Cantidad.deleteMany({ Pedido: req.params.id });
            await Pedido.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Pedido eliminado" });
        } else {
            res.status(500).send({ message: "El pedido no existe" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

PedidoController.EliminarArticulo = async (req, res) => {
    try {
        const { pedido, producto } = req.body;

        const pedCreador = await Pedido.findOne({ _id: pedido });
        const prodCreador = await Cantidad.findOne({ _id: producto });

        if (pedCreador === null || prodCreador === null) {
            let mensaje = "Los siguientes campos no existen :";
            if (!pedCreador) {
                mensaje += " Pedido";
            }
            if (!prodCreador) {
                mensaje += " Producto";
            }
            res.status(400).json({ message: mensaje });
        } else {
            if (pedCreador.Estado == "Creado") {
                if (pedCreador._id != prodCreador.Pedido) {
                    await Cantidad.deleteOne({ Pedido: pedido});
                    res.status(200).json({ message: "Articulo eliminado" });
                } else {
                    res.status(500).json("El producto no pertenece al pedido");
                }
            } else {
                res.status(500).json("El pedido ya fue enviado");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


PedidoController.BuscarEntreFechasR = async (req, res) => {
    try {
        const { fecha1, fecha2 , restaurante, usuario } = req.body;
        // las fechas y el restaurante son opcionales usuario es obligatorio 
        if (fecha1 && fecha2 && restaurante && usuario) {
            const pedidos = await Pedido.find({ Fecha: { $gte: fecha1, $lte: fecha2 }, Restaurante: restaurante, Usuario: usuario });
            res.status(200).json(pedidos);
        } else if (fecha1 && fecha2 && usuario) {
            const pedidos = await Pedido.find({ Fecha: { $gte: fecha1, $lte: fecha2 }, Usuario: usuario });
            res.status(200).json(pedidos);
        } else if (usuario && restaurante) {
            const pedidos = await Pedido.find({ Usuario: usuario, Restaurante: restaurante });
            res.status(200).json(pedidos);
        } else if (usuario) {
            const pedidos = await Pedido.find({ Usuario: usuario });
            res.status(200).json(pedidos);
        } else {
            res.status(500).json("Faltan campos");
        }


    } catch (err) {
        res.status(500).json(err);
    }
}

PedidoController.SinAceptar = async (req, res) => {
    try {
        const usuario = req.params.id;
        if (usuario) {
            if (usuario == pedidos.Usuario) {
                const pedidos = await Pedido.find({ Estado: "Creado" });
                res.status(200).json(pedidos);
            } else {
                res.status(500).json("El usuario no es el creador del pedido");
            }
        } else {
            res.status(500).json("Faltan campos");

        }
    } catch (err) {
        res.status(500).json(err);
    }
}

PedidoController.PedidoAceptar = async (req, res) => {
    try {
        const { pedido, usuario } = req.body;

        const pedCreador = await Pedido.findOne({ _id: pedido });
        const usuCreador = await Usuarios.findOne({ _id: usuario });

        if(pedCreador){
            if(""+usuCreador.tipousu == "Domiciliario"){
                if (pedCreador.Estado == "Enviado") {
                    pedCreador.Estado = "Aceptado";
                    pedCreador.mensajero = usuario;
                    await pedCreador.save();
                    res.status(200).json(pedCreador);
                } else {
                    res.status(500).json("El pedido no puede ser aceptado");
                }
            }else{
                res.status(500).json("El usuario no es un domiciliario");
            }
            
        }
        else{
            res.status(500).json("El pedido no existe");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

PedidoController.recibido = async (req, res) => {
    try {
        const { pedido, usuario } = req.body;

        const pedCreador = await Pedido.findOne({ _id: pedido });
        const usuCreador = await Usuarios.findOne({ _id: usuario });

        if (pedCreador === null || usuCreador === null) {
            let mensaje = "Los siguientes campos no existen :";
            if (!pedCreador) {
                mensaje += " Pedido";
            }
            if (!usuCreador) {
                mensaje += " Usuario";
            }
            res.status(400).json({ message: mensaje });
        } else {
            const restau = await Restaurante.findOne({ _id: pedCreador.Restaurante });

            if (pedCreador.Estado == "Aceptado") {
                if (restau.dueño == usuario) {
                    pedCreador.Estado = "Recibido";
                    await pedCreador.save();
                    res.status(200).json(pedCreador);
                } else {
                    res.status(500).json("El usuario no es el dueño del restaurante ");
                }
            } else {
                res.status(500).json("El pedido no puede ser recibido");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


PedidoController.EnDireccion = async (req, res) => {
    try {
        const { pedido, usuario } = req.body;

        const pedCreador = await Pedido.findOne({ _id: pedido });
        const usuCreador = await Usuarios.findOne({ _id: usuario });

        if (pedCreador === null || usuCreador === null) {
            let mensaje = "Los siguientes campos no existen :";
            if (!pedCreador) {
                mensaje += " Pedido";
            }
            if (!usuCreador) {
                mensaje += " Usuario";
            }
            res.status(400).json({ message: mensaje });
        } else {
        
            if (pedCreador.Estado == "Recibido") {
                if (pedCreador.mensajero == usuario) {

                    pedCreador.Estado = "En Direccion";
                    await pedCreador.save();
                    res.status(200).json(pedCreador);
                } else {
                    res.status(500).json("El usuario no es el mensajero del pedido ");
                }
            } else {
                res.status(500).json("El pedido no puede ser recibido");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

PedidoController.Realizado = async (req, res) => {
    try {
        const { pedido, usuario } = req.body;

        const pedCreador = await Pedido.findOne({ _id: pedido });
        const usuCreador = await Usuarios.findOne({ _id: usuario });

        if (pedCreador === null || usuCreador === null) {
            let mensaje = "Los siguientes campos no existen :";
            if (!pedCreador) {
                mensaje += " Pedido";
            }
            if (!usuCreador) {
                mensaje += " Usuario";
            }
            res.status(400).json({ message: mensaje });
        } else {
            
            if (pedCreador.Estado == "En Direccion") {
                if (pedCreador.Usuario == usuario) {

                    pedCreador.Estado = "Realizado";
                    await pedCreador.save();
                    res.status(200).json(pedCreador);
                } else {
                    res.status(500).json("El usuario no es el dueño del pedido ");
                }
            } else {
                res.status(500).json("El pedido no puede ser recibido");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

PedidoController.PedidosRestaurante = async (req, res) => {
    try {
        //obtendremos los pedidos en curso del restaurante estasdos "Enviado" o "Aceptado" 
        const { restaurante, usuario } = req.body;
        
            const usuCreador = await Usuarios.findOne({ _id: usuario });
            const restaurant = await Restaurante.findOne({ _id: restaurante });
        if (usuCreador && restaurant) {
                if (""+usuCreador._id == ""+restaurant.dueño) {
                    const pedidos = await Pedido.find({ Restaurante: restaurant, Estado: { $in: ["Enviado", "Aceptado"] } });
                    res.status(200).json(pedidos);
                } else {
                    res.status(500).json("El usuario no es el dueño del restaurante ");
                }

        } else {
            res.status(500).json("Faltan campos");
            
        }
    } catch (err) {
        res.status(500).json(err);
    }
}



    

PedidoController.PedidoEnviar = async (req, res) => {
    
    const { usuario , pedido } = req.body;

    const pedCreador = await Pedido.findOne({ _id: pedido });
    const usuCreador = await Usuarios.findOne({ _id: usuario });

    if (pedCreador === null || usuCreador === null) {
        let mensaje = "Los siguientes campos no existen :";
        if (!pedCreador) {
            mensaje += " Pedido";
        }
        if (!usuCreador) {
            mensaje += " Usuario";
        }
        res.status(400).json({ message: mensaje });
        } else {
            if (pedCreador.Estado == "Creado") {
                if (pedCreador.Usuario == usuario) {
                    pedCreador.Estado = "Enviado";
                    await pedCreador.save();
                    res.status(200).json(pedCreador);
                } else {
                    res.status(500).json("El pedido no pertenece al usuario");
                }
            } else {
                res.status(500).json("El pedido ya fue enviado");
            }
        }


}

module.exports = PedidoController;
