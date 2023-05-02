const UsuarioController = {}
const Usuario = require('../modelos/user/Usuario')


UsuarioController.UserResgister = async (req, res) => {

    try {

    const { nombre, celular, correo, contrasena, direccion, tipousu } = req.body;

    const Email = await Usuario.findOne({correo: correo})


        if (Email) {  
         res.status(500).send({message: 'El correo ya existe'}) 
        }else{
          const nuevoUsuario = new Usuario ({ nombre, celular, activo : true , correo, contrasena, direccion, tipousu });
      
          //console.log(req.body);
          await nuevoUsuario.save()
          //console.log(nuevoUsuario);
          res.send(nuevoUsuario);
        }


    } catch (err) {

    console.error(err);
    res.status(500).json(err);
  }
    
}

UsuarioController.UserLogin = async (req, res) => {
    try {

        const { correo, contrasena } = req.body;
        const nuevoUsuario = await Usuario.findOne({ correo, contrasena });
        //console.log(req.body);
      if (nuevoUsuario) {
        res.status(200).send({message: 'El usuario se logeo'})
        }else{
        res. status(500).send({message: 'El usuario no se logeo'})
        }
          
        //console.log(nuevoUsuario);
        } catch (err) {
    
        console.error(err);
        res.status(500).json(err);
      }

}

UsuarioController.UserBuscar = async (req, res) => {
    console.log(req.params.id);
    try{
        
    const usuario = await Usuario.findOne({_id: req.params.id});
    console.log(usuario);
    res.send(usuario)
    } catch (err) {
      res.status(500).json(err);
    }
    
}

UsuarioController.UserBuscarT = async (req, res) => {
    try{
    const usuarios = await Usuario.find() 
    res.json(usuarios)
    } catch (err) {
    res.status(500).json(err);
    }
}

UsuarioController.UserBorrar = async (req, res) => {
    console.log(req.params.id);
    try{

    const usuario = await Usuario.findOne({_id: req.params.id});
    
    if(usuario){
        await Usuario.findByIdAndDelete(usuario._id)
        res.json(usuario)
    }else{
        res.json("usuarios no encontrado")
    }

    console.log(usuario);
    } catch (err) {
      res.status(500).json(err);
    }
    res.send('UserBorrar')
}

UsuarioController.UserActualizar = async (req, res) => {
    
    console.log(req.params.id);
    try{

    const usuario = await Usuario.findOne({_id: req.params.id});
    
    if(usuario){
        const { nombre, celular, correo, contrasena, direccion, tipousu, activo} = req.body;

        await Usuario.findByIdAndUpdate(usuario._id,{nombre, celular, correo, contrasena, direccion, tipousu, activo})
        res.json(usuario)
    }else{
        res.json("usuarios no encontrado")
    }

    console.log(usuario);
    } catch (err) {
      res.status(500).json(err);
    }

    res.send('UserActualizar')
}


module.exports = UsuarioController