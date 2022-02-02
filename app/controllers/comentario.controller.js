const db = require("../models");
const comentarios = db.comentario;
const abogados = db.abogado;
const Op = db.Sequelize.Op;
const { Sequelize } = require("../models");

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
    .then(async data => {
        await getPromedioCalif(req.body.abogadoId);
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

getPromedioCalif=(abogadoId) => {
    comentarios.findAll({
        where : {abogadoId: abogadoId},
        attributes: [[Sequelize.fn('SUM', Sequelize.col('calificacion')), 'suma'],
        [Sequelize.fn('COUNT', Sequelize.col('calificacion')), 'cantidad'],]
    }).then(data=>{
        acum = data[0].dataValues.suma+5;
        cant = data[0].dataValues.cantidad+1;
        abogados.update(
            {calificacion: acum/cant},
            {where: {id: abogadoId}}
        );
        
    }).catch(err=>console.log(err));
}