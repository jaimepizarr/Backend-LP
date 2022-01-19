module.exports = (sequelize, Sequelize) => {
    const comentario = sequelize.define("categoria", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });

    return comentario;
};