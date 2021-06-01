const mysql  = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

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