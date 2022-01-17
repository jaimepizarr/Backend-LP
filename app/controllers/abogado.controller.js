const db = require("../models");
const Abogado = db.abogado;
const Ubicacion = db.ubicacion;
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

exports.findAll = (req, res) => {
    Abogado.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Ocurrió un error al obtener los abogados."
        });
    });
}

exports.findByCiudad = (req, res) => {
    Ubicacion.findAll({
        where: {ciudad: req.query.ciudad},
        include: [{
            model: Abogado,
            as: 'abogado'
        }]
    })
    .then(data => {
        response = data.map(item => item.abogado)
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
        message: "Ocurrió un error al obtener los abogados."
        });
    });
}