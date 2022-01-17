const { Sequelize } = require("../models");
const db = require("../models");
const Ubicacion = db.ubicacion;
const Op = db.Sequelize.Op;
exports.getCiudades = (req, res) => {
    Ubicacion.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('ciudad')), 'ciudad']],
    })
    .then(ciudades => {
        res.send(ciudades);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ciudades."
        });
    });
};

exports.create = (req, res) => {
    if(!req.body.abogadoId){
        res.status(400).send({
            message: "Debe especificar el abogado"
        });
    }
    ubicacion = {
        abogadoId: req.body.abogadoId,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
    }
    Ubicacion.create(ubicacion)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear la ubicación."
        });
    });
}



