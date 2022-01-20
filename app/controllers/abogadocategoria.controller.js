const db = require("../models");
const abogadoxcategoria = db.abogado_categoria;
const categoria = db.categoria;
const Op = db.Sequelize.Op;


exports.create = (req,res)=>{
    const abogado_categoria = {
        categoriumId : req.body.categorias,
        abogadoId: req.body.abogados
    };

    abogadoxcategoria.create(abogado_categoria)
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

exports.findCategoria=(id)=>{
    categoria.findAll({where: id})
    .then(data => {
        return data
    })
}
