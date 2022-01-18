module.exports = app =>{
    const usuarios = require("../controllers/usuario.controller.js");
    var router = require("express").Router();

    router.post("/",usuarios.create);

    router.get("/",usuarios.findAll);

   

    app.use('/api/usuarios',router);
}