module.exports = app => {
    const ubicacion = require("../controllers/ubicacion.controller.js");
    var router = require("express").Router();

    router.get('/ciudades', ubicacion.getCiudades);
    router.post('/', ubicacion.create);

    app.use('/api/ubicacion', router);
}