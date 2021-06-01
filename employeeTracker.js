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

connection.connect(err => {
    if (err) throw err;
    start();
})

const start = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'firstAction',
            message: 'What do you want to do?',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'Add employee',
                'Add department',
                'Add role',
                'Update employee roles'
            ]
        }
    ).then(answer => {
        switch(answer.firstAction){
            case 'View all employees':
                allEmployees();
                break;
            case 'View all roles':
                allRoles();
                break;
            case 'View all departments':
                allDepartments();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Update employee roles':
                update();
                break;
            default:
                console.log("Try again");
                start();
                break;
        }
    })
}

const allEmployees = () => {
    console.log("all employees");
}

const allRoles = () => {
    console.log("all roles")
}

const allDepartments = () => {
    console.log("all departments");
}

const addEmployee = () => {
    console.log("add employee")
}

const addDepartment = () => {
    console.log("add department")
}

const addRole = () => {
    console.log("add role")
}

const update = () => {
    console.log("update")
}