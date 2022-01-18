const { abogado } = require("../models/index.js");

module.exports = app => {
    const abogados = require("../controllers/abogado.controller.js");

    var router = require("express").Router();

    router.post("/", abogados.create);

    router.get("/comentarios/:id", abogado.findAll);
    router.get("/by_id?id=:id", abogado.findOne);
    router.get("/",abogado.findAll);

    app.use('/api/abogados',router);
}