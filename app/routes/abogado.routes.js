const { abogado } = require("../models/index.js");

module.exports = app => {
    const abogados = require("../controllers/abogado.controller.js");

    var router = require("express").Router();

    router.post("/", abogados.create);

    router.get("/comentarios/:id", abogados.findComments);
    router.get("/by_id?id=:id", abogados.findOne);
    router.get("/ranking", abogados.findRanking);
    router.get("/", abogados.findAll);
    router.get("/byCiudad", abogados.findByCiudad);


    app.use('/api/abogados', router);
}