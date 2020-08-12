// Query strings

// Department table
const viewAllDeptsQ = () => {
    return `SELECT id, name AS Department FROM department;`;
}

// Role table
const viewAllRolesQ = () => {
    return `SELECT r.id, r.title AS Title, r.salary AS Salary, name AS 'Department' 
    FROM role r 
    LEFT JOIN department d 
    ON r.department_id = d.id;`;
}

// Employee table with corresponding roles, managers, and departments
const viewAllEmployeesQ = () => {
    return `SELECT 
    e.id, 
    CONCAT (e.first_name, ' ', e.last_name) AS Employee, 
    title AS Title, salary AS Salary, 
    name AS 'Department', 
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
        FROM employee e
        LEFT JOIN role r
        ON e.role_id = r.id
        LEFT JOIN department d
        ON r.department_id = d.id
        LEFT JOIN employee m
        ON e.manager_id = m.id;`;
}

// List of managers
const managerListQ = () => {
    return `SELECT DISTINCT CONCAT (m.first_name, ' ', m.last_name) AS manager 
    FROM employee m 
    INNER JOIN employee e 
    ON e.manager_id = m.id;`;
}

// List of employees by manager
const employeesByManagerQ = (first, last) => {
    return `SELECT CONCAT (e.first_name, '  ', e.last_name) AS Employee 
    FROM employee m 
    INNER JOIN employee e 
    ON e.manager_id = m.id
    AND m.first_name = '${first}'
    AND m.last_name = '${last}';`;
}

// Department list
const deptListQ = () => {
    return `SELECT name FROM department;`;
}

// List of employees by department
const employeesByDeptQ = (dept) => {
    return `SELECT name AS Department, title as Title, CONCAT (first_name, ' ', last_name) AS Employee 
    FROM employee e 
    INNER JOIN role r 
    ON e.role_id = r.id 
    INNER JOIN department d 
    ON r.department_id = d.id 
    AND d.name = '${dept}';`;
}

// Add a department
const insertDeptQ = (dept) => {
    return `INSERT INTO department(name)
    VALUES ('${dept}');`;
}

// Add role
const insertRoleQ = (role, salary, dept) => {
    return `INSERT INTO role (title, salary, department_id)
    VALUES (
        '${role}', 
        ${salary}, 
        (SELECT id FROM department
        WHERE name = '${dept}')
    );`;
}

// Roles and employees
const rolesAndEmployeesQ = () => {
    return `SELECT title, CONCAT(first_name, ' ', last_name) AS 'name' 
    FROM role r
    LEFT JOIN employee e
    ON r.id = e.role_id;`;
}

// Add an employee
const insertEmployeeQ = (first, last, role, mFirst, mLast) => {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (
        '${first}', 
        '${last}', 
        (SELECT id FROM role
            WHERE role.title = '${role}'), 
        (SELECT e.id FROM employee e
                WHERE e.first_name = '${mFirst}'
                AND e.last_name = '${mLast}')
    );`;
}

// Update an employee's role
const updateRoleQ = (role, first, last) => {
    return `
    UPDATE employee
        SET role_id = (SELECT id FROM role WHERE title = '${role}')
        WHERE first_name = '${first}'
        AND last_name = '${last}';`;
}

// List of managers and employees
const employeesAndManagerQ = () => {
    return `SELECT CONCAT (m.first_name, ' ', m.last_name, ' (ID: ', m.id, ')') AS manager, CONCAT (e.first_name, ' ', e.last_name) AS employee 
    FROM employee e 
    INNER JOIN employee m
    ON e.manager_id = m.id;`;
}

// Update an employee's manager
const updateManagerQ = (id) => {
    return `UPDATE employee 
        SET manager_id = ${id};`;
}

// Delete a department
const deleteDeptQ = (dept) => {
    return `DELETE FROM department WHERE name = '${dept}';`;
}

// List of roles
const roleListQ = () => {
    return `SELECT title FROM role;`;
}

// Delete a role
const deleteRoleQ = (role) => {
    return `DELETE FROM role WHERE title = '${role}';`;
}

// List of employee names
const employeeListQ = () => {
    return `SELECT CONCAT (first_name, ' ', last_name) AS name FROM employee;`;
}

// Delete an employee
const deleteEmployeeQ = (first, last) => {
    return `DELETE 
    FROM employee 
    WHERE first_name = '${first}' 
    AND last_name = '${last}';`;
}

// List of salaries by department
const deptSalariesQ = (dept) => {
    return `SELECT salary 
    FROM employee e 
    INNER JOIN role r 
        ON e.role_id = r.id 
    INNER JOIN department d 
        ON r.department_id = d.id 
        AND d.name = '${dept}';`;
}

module.exports = { viewAllDeptsQ, viewAllRolesQ, viewAllEmployeesQ, managerListQ, employeesByManagerQ, deptListQ, employeesByDeptQ, insertDeptQ, insertRoleQ, rolesAndEmployeesQ, insertEmployeeQ, updateRoleQ, employeesAndManagerQ, updateManagerQ, deleteDeptQ, roleListQ, deleteRoleQ, employeeListQ, deleteEmployeeQ, deptSalariesQ };