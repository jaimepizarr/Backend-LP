module.exports = (sequelize, Sequelize) => {
    const comentario = sequelize.define("categoria", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });

    return comentario;
};