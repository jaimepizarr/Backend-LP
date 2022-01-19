module.exports = app => {
    const abogadosxcategoria = require("../controllers/abogadocategoria.controller.js");

    var router = require("express").Router();

    router.post("/", abogadosxcategoria.create);

    app.use('/api/abogadoscategoria', router);
}