module.exports = (sequelize, Sequelize)=>{
    const Usuario = sequelize.define("usuario",{
        nombre_completo:{
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        }
    });
    return Usuario;
}