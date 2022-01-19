const db = require("../models");
const abogado_categoria = db.abogadoxcategoria;
const Op = db.Sequelize.Op;


exports.create = (req,res)=>{
    const abogadoxcategoria = {
        categoria : req.body.categorias,
        abogado: req.body.abogados
    };

    abogado_categoria.create(abogadoxcategoria)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Ocurrio un error al asignar la categoria"
        });
    });
};


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

