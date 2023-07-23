const mysql = require('mysql2/promise');


//equivalente a create connection, conecto a la base de datos


const config = {
    host: 'localhost',
    user: 'root',
    password: 'Brenda1310!!',
    database: 'menudb',
}

const pool = mysql.createPool(config);

  

module.exports = pool;