module.exports = app =>{
    const usuarios = require("../controllers/usuario.controller.js");
    var router = require("express").Router();

    router.post("/",usuarios.create);
    router.post('/login', usuarios.login);

    router.get("/byId",usuarios.findUsuario);

    router.get("/",usuarios.findAll);

   

    app.use('/api/usuarios',router);
}