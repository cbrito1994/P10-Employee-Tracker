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
    connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
        console.log(res);
    });
}

const allRoles = () => {
    connection.query("SELECT title FROM role", (err, res) => {
        console.log(res);
    });
}

const allDepartments = () => {
    connection.query("SELECT department_name FROM department", (err, res) => {
        console.log(res);
    });
}

const addEmployee = () => {
    const rolesArray = [];
    connection.query('SELECT * FROM role', (err, res) => {
        res.forEach((choices) => {
            rolesArray.push(choices.title);
        });
        
    })
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        
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
                choices() {
                    rolesArray
                },
            },{
                type: 'list',
                name: 'manager',
                message: 'Who is the employee manager?',
                choices() {
                    const choiceArray = [];
                    res.forEach((choices) => {
                        choiceArray.push(choices.manager_id);
                    });
                    return choiceArray;
                },
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
    });
}

const addDepartment = () => {
    inquirer.prompt([{
        name: 'NewDepartment',
        type: 'list',
        message: 'Please insert the type of department for the employees',
        choices: ["Engineer", "Human Resources", "Finance and Legal", "Marketing and Sales",]
    }]).then((answer) => {
        console.log("You have successfully added the department!");
    })
}

const addRole = () => {
    console.log("add role")<
    inquirer.prompt([{
        name: 'title',
        type: 'list',
        message: 'Choose the title of the employee',
        choices: [
          "Talent Acquisition Manager",
          "Talent Acquisition Assistant",
          "Accountant",
          "Lawyer",
          "Manager",
          "Executive",
          "Jr Executive",
          "Sr Developer",
          "Frontend Developer",
          "Backend Developer"
        ]
    },{
        name: 'salary',
        type: 'input',
        message: 'What is the employee´s salary?'
    }]).then((answers) => {
        console.log("You have succesfully added the salary!");
    })
}

const update = () => {
    console.log("update")
}