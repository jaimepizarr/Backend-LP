const { response } = require("express");
const { abogado, telefono } = require("../models");
const db = require("../models");
const Abogado = db.abogado;
const abogadoxcategoria = db.abogado_categoria;
const categoria = db.categoria;
const Ubicacion = db.ubicacion;
const Telefono = db.telefono;
const Op = db.Sequelize.Op;
const encryption = require("../utils/encryption");

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.nombre_completo || !req.body.correo || !req.body.contrasena) {
        res.status(400).send({
            message: "Se necesita que se incluya toda la información del abogado.", data: req.body
        });
        return;
    }

    const passwordEncrypt = await encryption.encrypt(req.body.contrasena);
    console.log(passwordEncrypt);

    // Create a Tutorial
    const abogado = {
        nombre_completo: req.body.nombre_completo,
        correo: req.body.correo,
        descripcion: req.body.descripcion,
        experiencia: req.body.experiencia,
        calificacion: req.body.calificacion ? req.body.calificacion : 0,
        contrasena: passwordEncrypt
    };

    // Save
    Abogado.findOrCreate({
        where: {
            correo: abogado.correo
        },
        defaults: abogado
    })
        .then(data => {
            if (data[1]) {
                res.send(data[0]);
            } else {
                res.status(400).send({ "message": "El correo ya está registrado." });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el abogado."
            });
        });

};

exports.login = (req, res) => {
    // Validate request
    if (!req.body.correo || !req.body.contrasena) {
        res.status(400).send({
            message: "Se necesita el correo y la contraseña."
        });
    } else {
        Abogado.findOne({ where: { correo: req.body.correo } })
            .then(async data => {
                data = data["dataValues"];
                abogado_pass = data.contrasena;
                let isValid = await encryption.compare(req.body.contrasena, abogado_pass)
                if (isValid) {
                    res.status(200).send(data);
                } else {
                    res.status(401).send({
                        message: "Contraseña incorrecta."
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: "No se encontró el abogado." });
            });
    }
};


exports.findRanking = (req, res) => {

    Abogado.findAll(
        {
            attributes: ["id", "nombre_completo", "correo", "descripcion", "experiencia", "calificacion"],
            order: [["calificacion", "DESC"]]
        }
    ).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al consultar los abogados."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.query.id;
    Abogado.findOne({
        where: { id: id },
        include: [{
            model: categoria,
        }]
    })
        .then(async data => {
            var ubicacion = await Ubicacion.findAll({
                where: { abogadoId: id },
            });
            var telefono = await Telefono.findAll({
                where: { abogadoId: id },
            })
            data.dataValues.ubicacion = ubicacion;
            data.dataValues.telefono = telefono;
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
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
        where: { ciudad: req.query.ciudad },
        include: [{
            model: Abogado,
            as: 'abogado'
        }]
    })
        .then(data => {
            res.send(data.map(item => item.abogado));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los abogados."
            });
        });
}


exports.findByCategoria = (req, res) => {
    const id_cat = req.query.categoria;
    categoria.findAll({
        where: { id: id_cat },
        include: [{
            model: Abogado,
            as: 'abogados'
        }],
    })
        .then(data => {
            res.send(data.map(item => item.abogados));
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Ocurrió un error al obtener los abogados perteneciente a la categoria de id: ${id_cat}.`
            });
        })
    //console.log("enviando datos")

}