module.exports = {
    HOST: 'localhost',
    USER: 'Usereddo',
    PASSWORD: 'EddoAlv3990', //Use your own password
    DB: 'abonetdb',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
