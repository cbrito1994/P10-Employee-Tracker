/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employeesDB;

/* Insert 3 Rows into your new table */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carlos", "Brito", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sofia", "Rojas", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Enrique", "Rodriguez", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carolina", "Flores", 1, 2);

-- ROLES
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Broker", 200.10, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Administrative", 53.30, 1);

-- DEPARTMENTS
INSERT INTO department (department_name)
VALUES ("Marketing and Sales");

INSERT INTO department (department_name)
VALUES ("Human Resources");