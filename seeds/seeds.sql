/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employeesDB;

/* Insert 3 Rows into your new table */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carlos", "Brito", 1, 1), ("Sofia", "Rojas", 2, 2), ("Enrique", "Rodriguez", 3, 1), ("Carolina", "Flores", 1, 2)

-- ROLES
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100.00, 1), ("Broker", 200.10, 2), ("Administrative", 53.30, 1);

-- DEPARTMENTS
INSERT INTO department (name)
VALUES ("Marketing, Sales, Finance, Accounting");