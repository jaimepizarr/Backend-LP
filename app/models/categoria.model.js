module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });

    return Categoria;
};