const mysql = require("myql");
const util = require("util");

const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: process.env.PORT,
    // Your username
    user: process.env.USER,
    // Be sure to update with your own MySQL password!
    password: process.env.PASSWORD,
    database: 'employeesDB',
});


  
connection.connect((err) => {
    if (err) throw err;
});

connection.query = util.promisify(conecction.query);

module.exports = connection;