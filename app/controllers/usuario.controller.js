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


exports.create= (req,res)=>{
    if(!req.body.nombre_completo){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    const usuario={
        nombre_completo: req.body.nombre_completo,
        correo: req.body.correo
    };

    Usuario.create(usuario)
    .then(data=>{
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al registrar al usuario"
        });
    });
};
