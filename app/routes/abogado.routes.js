const { abogado } = require("../models/index.js");

module.exports = app => {
    const abogados = require("../controllers/abogado.controller.js");

    var router = require("express").Router();

    router.post("/", abogados.create);

    router.get("/by_id", abogados.findOne);
    router.get("/ranking", abogados.findRanking);
    router.get("/", abogados.findAll);
    router.get("/byCiudad", abogados.findByCiudad);


    app.use('/api/abogados', router);
}