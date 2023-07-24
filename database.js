const mysql = require('mysql2/promise');


//equivalente a create connection, conecto a la base de datos


const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}

const pool = mysql.createPool(config);

  

module.exports = pool;