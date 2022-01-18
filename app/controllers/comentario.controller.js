const db = require("../models");
const comentarios = db.comentario;
const abogados = db.abogado;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.mensaje) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Tutorial
    const comentario = {
        mensaje: req.body.mensaje,
        calificacion: req.body.calificacion ? req.body.calificacion : 0,
        abogadoId: req.body.abogadoId,
        usuarioId: req.body.usuarioId
    };
    
    // Save
    comentarios.create(comentario)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Ocurrió un error al crear su comentario."
        });
    });
};


exports.findComments = (req,res) =>{
    const id= req.query.id;

    comentarios.findAll({
        where : {abogadoId: id}
    })
    .then(data=>{
        //response = data.filter(item => {item.abogado})
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: "Ocurrió un error al obtener los Comentarios."
            });
    });

}
