module.exports = app => {
    const abogados = require("../controllers/abogado.controller.js");

    var router = require("express").Router();

    router.post("/", abogados.create);



    app.use('api/abogados',router);
}