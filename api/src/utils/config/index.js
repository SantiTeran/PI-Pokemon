require('dotenv').config();

module.exports = {
    dbUser:process.env.DB_USER || 'postgres',
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST || 'localhost',
    PORT:process.env.PORT 
}