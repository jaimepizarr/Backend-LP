module.exports = app => {
    const abogados = require("../controllers/abogado.controller.js");

    var router = require("express").Router();

    router.post("/", abogados.create);

    router.get("/ranking", abogados.findRanking);

    app.use('/api/abogados', router);
}