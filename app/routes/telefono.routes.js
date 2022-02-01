module.exports = app => {
    const telefono = require("../controllers/telefono.controller.js");
    var router = require("express").Router();

    router.post('/', telefono.create);

    app.use('/api/telefono', router);
}