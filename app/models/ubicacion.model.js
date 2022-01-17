module.exports = (sequelize, Sequelize) => {
    const Ubicacion = sequelize.define("ubicacion", {
        ciudad: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
    });

    return Ubicacion;
}