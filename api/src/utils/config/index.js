require('dotenv').config();

module.exports = {
    dbUser:process.env.DB_USER || 'postgres',
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST || 'localhost',
    dbName:process.env.DB_NAME || 'pokemon',
    PORT:process.env.PORT || 3001
}