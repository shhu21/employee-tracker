-- Template database data

-- Template department data
INSERT INTO department(name) 
VALUES 
    ('Accounting'),
    ('Engineering'),
    ('Human Resources'),
    ('Sales');

-- Template role data
INSERT INTO role(title, salary, department_id) 
VALUES 
    ('Engineer', 200000, 2),
    ('Accountant', 160000, 1),
    ('HR', 150000, 3),
    ('Sales', 170000, 4);

-- Template employee data
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Smith', 1, NULL),
    ('Jane', 'Doe', 1, 1),
    ('Eric', 'Hayes', 2, NULL),
    ('Liz', 'Mall', 2, 3),
    ('Max', 'Well', 3, NULL),
    ('Lucy', 'Lu', 3, 5),
    ('Luis', 'Dan', 4, NULL),
    ('Kim', 'Kale', 4, 7);