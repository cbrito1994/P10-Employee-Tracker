const mysql = require("mysql");
const util = require("util");
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'employeesDB',
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;