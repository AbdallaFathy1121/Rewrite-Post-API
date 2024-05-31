require("dotenv").config();

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustedconnection: true,
    trustServerCertificate: true,
    enableArithAort: true,
    encrypt: true,
  },
};
  
module.exports = config;