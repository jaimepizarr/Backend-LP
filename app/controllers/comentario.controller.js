const db = require("../models");
const comentarios = db.comentario;
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
        calificacion: req.body.calificacion ? req.body.calificacion : 0
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