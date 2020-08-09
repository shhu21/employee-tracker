-- Template database data

-- Template department data
INSERT INTO department(name) VALUES ('Accounting');
INSERT INTO department(name) VALUES ('Engineering');
INSERT INTO department(name) VALUES ('Human Resources');
INSERT INTO department(name) VALUES ('Sales');

-- Template role data
INSERT INTO role(title, salary, department_id) VALUES ('Engineer', 200000, 2);
INSERT INTO role(title, salary, department_id) VALUES ('Accountant', 160000, 1);
INSERT INTO role(title, salary, department_id) VALUES ('HR', 150000, 3);
INSERT INTO role(title, salary, department_id) VALUES ('Sales', 170000, 4);

-- Template Employee data
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 1, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Eric', 'Hayes', 2, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Liz', 'Mall', 2, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Max', 'Well', 3, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Lucy', 'Lu', 3, 5);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Luis', 'Dan', 4, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Kim', 'Kale', 4, 7);