const { response } = require("express");
const db = require("../models");
const Abogado = db.abogado;
const Comentario = db.comentario;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre_completo) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Tutorial
    const abogado = {
        nombre_completo: req.body.nombre_completo,
        correo: req.body.correo,
        descripcion: req.body.descripcion,
        experiencia: req.body.experiencia,
        calificacion: req.body.calificacion ? req.body.calificacion : 0
    };
    
    // Save
    Abogado.create(abogado)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Ocurrió un error al crear el abogado."
        });
    });
};


exports.findComments = (req,res) =>{
    const id= req.params.id;

    Comentario.findAll({
        where : {abogadoId: id}, 
        include:[{
            model:Comentario,
            as: 'comentario'
        }]
    })
    .then(data=>{
        response = data.map(item=>item.comentario)
        res.send(response);
    })
    .catch(err=>{
        res.status(500).send({
            message: "Ocurrió un error al obtener los Comentarios."
            });
    })

}


exports.findOne = (req,res) =>{
    const id= req.params.id;
  Abogado.findOne({where: id})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};