module.exports = app => {
    const comentario = require("../controllers/comentario.controller.js");

    var router = require("express").Router();

    router.post("/", comentario.create);

    router.get("/byAbogadoID?id=:id",comentario.findComments);

    app.use('/api/comentario',router);
}