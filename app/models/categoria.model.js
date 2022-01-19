module.exports = (sequelize, Sequelize) => {
    const categoria = sequelize.define("categoria", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });

    return categoria;
};