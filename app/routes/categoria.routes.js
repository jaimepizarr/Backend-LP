module.exports = app => {
    const categoria = require("../controllers/categoria.controller.js");

    var router = require("express").Router();

    router.post("/", categoria.create);
    router.get("/", categoria.findAll);
    router.get("/byAbg", categoria.findAbogados);
    app.use('/api/categorias', router);
}