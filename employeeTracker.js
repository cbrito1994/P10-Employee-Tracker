const inquirer = require('inquirer');
const db = require("./db/database");

start();

function start() {
  let firstAnswer;
  inquirer.prompt([{
    type: "list",
    name: "choice",
    message: "What do you want to do?",
    choices: [
      {
        name: "View all employees",
        value: "seeAllEmployees"
      },
      {
        name: "View all employees by department",
        value: "seeAllEmployeesByDepartment"
      },
      {
        name: "View all employees by manager",
        value: "seeAllEmployeesByManager"
      },
      {
        name: "View all roles",
        value: "seeAllRoles"
      },
      {
        name: "View All Departments",
        value: "seeAllDepartments"
      },
      {
        name: "Add employee",
        value: "newEmployee"
      },
      {
        name: "Remove employee",
        value: "deleteEmployee"
      },
      {
        name: "Quit",
        value: "QUIT"
      }
    ]
  }]).then(response => {
    firstAnswer = response.choice;
    switch (firstAnswer) {
      case "seeAllEmployees":
        return seeEmployees();
      case "seeAllEmployeesByDepartment":
        return seeEmployeesByDepartment();
      case "seeAllEmployeesByManager":
        return seeEmployeesByManager();
      case "seeAllDepartments":
        return seeAllDepartments();
      case "seeAllRoles":
        return seeRoles();
      case "newEmployee":
        return addEmployee();
      case "deleteEmployee":
        return deleteEmployee();
      default:
        return quit();
    }
  });
}

async function seeEmployees() {
  const allEmployees = await db.searchAllEmployees();
  console.log("\n");
  console.table(allEmployees);
  start();
}

async function seeEmployeesByDepartment() {
  const allDepartments = await db.searchAllDepartments();
  const departmentChoices = allDepartments.map((department) => ({
    name: department.name,
    value: department.id
  }));
  const { departmentId } = await inquirer.prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which employees would you like to see per department?",
      choices: departmentChoices
    }
  ]);
  const employeesByDepartment = await db.searchAllEmployeesByDepartment(departmentId);
  console.log("\n");
  console.table(employeesByDepartment);
  start();
}

async function seeEmployeesByManager() {
  const managers = await db.searchAllEmployees();
  const managersOptions = managers.map((manager) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.id
  }));
  const { managerId } = await inquirer.prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which employee do you want to see his boss?",
      choices: managersOptions
    }
  ]);
  const employees = await db.searchAllEmployeesByManager(managerId);
  console.log("\n");
  if (employees.length === 0) {
    console.log("The selected employee has no boss");
  } else {
    console.table(employees);
  }
  start();
}

async function seeAllDepartments() {
  const departments = await db.searchAllDepartments();
  console.log("\n");
  console.table(departments);
  start();
}

async function seeRoles() {
  const roles = await db.searchAllRoles();
  console.log("\n");
  console.table(roles);
  start();
}

async function addEmployee() {
  const roles = await db.searchAllRoles();
  const employees = await db.searchAllEmployees();
  const employee = await inquirer.prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id
  }));
  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });
  employee.role_id = roleId;
  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });
  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });
  employee.manager_id = managerId;
  await db.addEmployee(employee);
  console.log(
    `Employee ${employee.first_name} ${employee.last_name} added`
  );
  start();
}

async function deleteEmployee() {
  const employees = await db.searchAllEmployees();
  const employeesOptions = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }));
  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to delete?",
      choices: employeesOptions
    }
  ]);
  await db.deleteEmployee(employeeId);
  console.log("Employee deleted");
  start();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
