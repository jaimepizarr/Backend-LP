const db = require("../models");
const abogado_categoria = db.abogado_categoria;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    abogado_categoria.findByPk(req.params.id, {
        include: ["abogado"]
    }).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al consultar las categorias"
        });
    }
    );
};

