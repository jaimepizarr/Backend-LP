module.exports = (sequelize, Sequelize) => {
    const Telefono = sequelize.define("telefono", {
        telefono: {
            type: Sequelize.STRING
        },
    });

    return Telefono;
}