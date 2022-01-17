module.exports = app => {
    const comentario = require("../controllers/comentario.controller.js");

    var router = require("express").Router();

    router.post("/", comentario.create);



    app.use('api/comentario',router);
}