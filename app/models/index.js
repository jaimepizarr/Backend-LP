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
db.ubicacion = require("./ubicacion.model.js")(sequelize, Sequelize);
db.ubicacion.belongsTo(db.abogado, {as: 'abogado'});
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.comentario = require("./comentario.models.js")(sequelize, Sequelize);
db.categoria = require("./categoria.model.js")(sequelize, Sequelize);
db.abogado_categoria = require("./abogadocategoria.model.js")(sequelize, Sequelize);

db.abogado.hasMany(db.comentario, { as: "comentarios" });
db.usuario.hasMany(db.comentario, { as: "comentarios" });

db.comentario.belongsTo(db.abogado, {
  foreignKey: "abogadoId",
  as: "abogado",
});

//Relaciones con la tabla abogado_categoria con categoria y abogado

// 1 abogdo puede tener muchas categorias
db.abogado.hasMany(db.abogado_categoria, { as: "categorias" });
db.abogado_categoria.belongsTo(db.abogado, {
  foreignKey: "abogadoId",
  as: "abogado",
});

// 1 categoria puede tener muchos abogados x categoria noc 
db.categoria.hasMany(db.abogado_categoria, { as: "abogados" });
db.abogado_categoria.belongsTo(db.categoria, {
  foreignKey: "categoriaId",
  as: "categoria",
});










db.comentario.belongsTo(db.usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});
module.exports = db;