const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;



exports.findAll = (req,res)=> {
    Usuario.findOne()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}


exports.create= async (req,res)=>{
    if(!req.body.nombre_completo || !req.body.correo || !req.body.contrasena){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    const passwordEncrypt = await encryption.encrypt(req.body.contrasena);
    console.log(passwordEncrypt);
    const usuario={
        nombre_completo: req.body.nombre_completo,
        correo: req.body.correo,
        contrasena: passwordEncrypt
    };

    Usuario.findOrCreate({
        where:{
            correo: usuario.correo
        },
        defaults: usuario
    })
    .then(data=>{
        if(data[1]) res.send(data[0]);
        else res.status(400).send({"message": "El correo ya está registrado."});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al registrar al usuario"
        });
    });
};
