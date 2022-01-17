const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.abogado = require("./abogado.model.js")(sequelize, Sequelize);
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.comentario = require("./comentario.models.js")(sequelize, Sequelize);
db.categoria = require("./categoria.model.js")(sequelize, Sequelize);

db.abogado.hasMany(db.comentario, { as: "comentarios" });
db.usuario.hasMany(db.comentario, { as: "comentarios" });

db.comentario.belongsTo(db.abogado, {
  foreignKey: "abogadoId",
  as: "abogado",
});

db.comentario.belongsTo(db.usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});
module.exports = db;