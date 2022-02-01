const db = require("../models");
const Telefono = db.telefono;

exports.create = (req, res) => {
    if(!req.body.abogadoId){
        res.status(400).send({
            message: "Debe especificar el abogado"
        });
    }
    data_send = {
        abogadoId: req.body.abogadoId,
        telefono: req.body.telefono,
    }
    Telefono.create(data_send)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear telefono."
        });
    });
}