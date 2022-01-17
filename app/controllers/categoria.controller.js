const db = require("../models");
const Categoria = db.categoria;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre_completo) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    const categoria = {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };

    Categoria.create(categoria)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al crear al usuario"
            });
        });

};

exports.findAll = (req, res) => {
    Categoria.findAll(
        {
            attributes: ["id", "nombre", "descripcion"]
        }

    ).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al consultar las categorias"
        });
    }
    );
};

