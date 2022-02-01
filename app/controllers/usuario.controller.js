const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
const encryption = require("../utils/encryption");


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

exports.login = (req,res)=>{
    if (!req.body.correo || !req.body.contrasena) {
        res.status(400).send({
            message: "Se necesita el correo y la contraseña."
        });
    }else{
        Usuario.findOne({ where: { correo: req.body.correo } })
        .then(async data => {
            data = data["dataValues"];
            user_pass = data.contrasena;
            let isValid = await encryption.compare(req.body.contrasena, user_pass)
            if (isValid){
                res.status(200).send(data);
            }else{
                res.status(401).send({
                    message: "Contraseña incorrecta."
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message: "No se encontró el usuario"});
        });
    }
}
