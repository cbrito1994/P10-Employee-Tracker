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
    console.log("add employee");
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        const rolesArray = [];
        res.forEach(roles => {
            rolesArray.push(roles.role_id)
        });
        console.log(rolesArray);
    });

    connection.query('SELECT * FROM employee WHERE ?', {
        role_id: 'Manager'
    },(err, res) => {
        if (err) throw err;
        const namesArray = [];
        res.forEach(roles => {
            namesArray.push(roles.first_name)
        });
        console.log(namesArray);
    });
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee first name?',
        },{
            type: 'input',
            name: 'lastName',
            message: 'What is the employee last name?',
        },{
            type: 'list',
            name: 'role',
            message: 'What is the employee role?',
            choices: [
                ''
            ]
        },{
            type: 'list',
            name: 'manager',
            message: 'Who is the employee manager?',
            choices: [
                ''
            ]
        }
    ]).then(answer => {
        const query = 'INSERT INTO employee SET ?';
        connection.query(query, {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
            manager_id: answer.manager
        }, err => {
            if (err) throw err;
            console.log('The employee was created successfully!');
            start();
        })
    })
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