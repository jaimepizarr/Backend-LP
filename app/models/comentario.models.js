module.exports = (sequelize, Sequelize)=>{
    const comentario = sequelize.define("comentario",{
        mensaje:{
            type: Sequelize.STRING
        },
        calificacion: {
            type: Sequelize.FLOAT,
            validate: {
                min: 0,
                max: 5
            }
        }
    });

    return comentario;
};