require("dotenv").config();

module.exports = {
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT || "5432",
  dbName: process.env.DB_NAME,
  PORT: process.env.PORT || 3001,
};
