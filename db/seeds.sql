INSERT INTO department(name) VALUES ('Accounting');
INSERT INTO department(name) VALUES ('Engineering');
INSERT INTO department(name) VALUES ('Human Resources');
INSERT INTO department(name) VALUES ('Sales');

INSERT INTO role(title, salary) VALUES ('Engineer', 200000);
INSERT INTO role(title, salary) VALUES ('Accountant', 160000);
INSERT INTO role(title, salary) VALUES ('HR', 150000);
INSERT INTO role(title, salary) VALUES ('Sales', 170000);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 1, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 1, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Eric', 'Hayes', 2, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Liz', 'Mall', 2, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Max', 'Well', 3, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Lucy', 'Lu', 3, 5);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Luis', 'Dan', 4, 8);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Kim', 'Kale', 4, NULL);