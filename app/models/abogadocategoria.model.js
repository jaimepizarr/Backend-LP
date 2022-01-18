module.exports = (sequelize, Sequelize) => {
    const abogadoxcategoria = sequelize.define("abogado", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },

    });

    return abogadoxcategoria;
}