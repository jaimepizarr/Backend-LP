module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root', //Use your own password
    DB: 'AbonetDB',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}