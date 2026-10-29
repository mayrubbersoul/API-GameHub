require("dotenv").config();
const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "senai2026",
    database: process.env.DB_NAME || "gamehub"
});

module.exports = conexao;