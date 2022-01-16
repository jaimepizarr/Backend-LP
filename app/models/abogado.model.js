module.exports = (sequelize, Sequelize) => {
    const Abogado = sequelize.define("abogado", {
        nombre_completo: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        descripcion:{
            type: Sequelize.STRING
        },
        experiencia:{
            type: Sequelize.TEXT
        },
        calificacion:{
            type: Sequelize.FLOAT,
            validate: {
                min: 0,
                max: 5
            }
        }
    });

    return Abogado;
}