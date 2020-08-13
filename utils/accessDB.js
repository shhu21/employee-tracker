const connection = require('../db/database');
const cTable = require('console.table');
const { viewAllDeptsQ, viewAllRolesQ, viewAllEmployeesQ, managerListQ, employeesByManagerQ, deptListQ, employeesByDeptQ, insertDeptQ, insertRoleQ, rolesAndEmployeesQ, insertEmployeeQ, updateRoleQ, employeesAndManagerQ, updateManagerQ, deleteDeptQ, roleListQ, deleteRoleQ, employeeListQ, deleteEmployeeQ, deptSalariesQ } = require('./queries');

// Displays a list of departments
const getDepts = () => {
    return connection.promise().query(viewAllDeptsQ())
    .then(result => {
        console.log('\n');
        console.table(result[0]);
    });
}

// Displays a list of all roles
const getRoles = () => {
    return connection.promise().query(viewAllRolesQ())
    .then(result => {
        console.log('\n');
        console.table(result[0]);
    });
}

// Displays a list of all employees
const getEmployees = () => {
    return connection.promise().query(viewAllEmployeesQ())
    .then(result => {
        console.log('\n');
        console.table(result[0]);
    });
}

// Displays a list of employees by manager
const employeesByManager = (manager) => {
    const managerName = manager.split(' ');
    return connection.promise().query(employeesByManagerQ(managerName[0], managerName[1]))
    .then(result => {
        console.log(`\nEmployees under Manager ${manager}:\n`);
        console.table(result[0]);
    });
}

// Displays a list of employees by department
const employeesByDept = (dept) => {
    return connection.promise().query(employeesByDeptQ(dept))
    .then(result => {
        console.log(`\nEmployees under Department ${dept}:`);
        console.table(result[0]);
    });
}

// Adds a new department
const insertDept = (dept) => {
    return connection.promise().query(insertDeptQ(dept))
    .then(result => {
        console.log(`\n${dept} was successfully added.`);
    });
}

// Adds a new role
const insertRole = (role) => {
    return connection.promise().query(insertRoleQ(role.role, role.salary, role.dept))
    .then(result => {
        console.log(`\n${role.role} was successfully added.`);
    });
}

// Adds a new employee
const insertEmployee = (employee) => {
    const manager = employee.manager.split(' ');

    return connection.promise().query(insertEmployeeQ(employee.firstName, employee.lastName, employee.role, manager[0], manager[1]))
    .then(result => {
        console.log(`\n${employee.firstName} ${employee.lastName} was successfully added.`);
    });
}

// Updates an employee's role
const updateEmployeeRole = (employee) => {
    const name = employee.employee.split(' ');

    return connection.promise().query(updateRoleQ(employee.role, name[0], name[1]))
    .then(result => {
        console.log(`\n${employee.employee}'s role is now ${employee.role}.`);
    });
}

// Updates an employee's manager
const updateEmployeeManager = (employee) => {
    const id = employee.manager.split(': ')[1].split(')')[0];
    const employeeName = employee.employee.split(' ');

    return connection.promise().query(updateManagerQ(id, employeeName[0], employeeName[1]))
    .then(result => {
        console.log(`\n${employee.employee}'s manager is now ${employee.manager}.`);
    });
}

// Deletes a department
const deleteDept = (dept) => {
    return connection.promise().query(deleteDeptQ(dept))
    .then(result => {
        console.log(`\nDepartment ${dept} has been deleted.`);
    });
}

// Deletes a role
const deleteRole = (role) => {
    return connection.promise().query(deleteRoleQ(role))
    .then(result => {
        console.log(`\Role ${role} has been deleted.`);
    });
}

// Deletes an employee
const deleteEmployee = (name) => {
    const employee = name.split(' ');

    return connection.promise().query(deleteEmployeeQ(employee[0], employee[1]))
    .then(result => {
        console.log(`\nEmployee ${name} has been deleted.`);
    });
}

// Displays a department's budget
const deptBudget = (dept) => {
    return connection.promise().query(deptSalariesQ(dept))
    .then(result => {
        let salary = 0;
        result[0].forEach(res => salary += parseInt(res.salary));

        console.log(`\nThe total utilized budget of Department ${dept} is $${salary}.`);
    });
}

module.exports = { getDepts, getRoles, getEmployees, employeesByManager, employeesByDept, insertDept, insertRole, insertEmployee, updateEmployeeRole, updateEmployeeManager, deleteDept, deleteRole, deleteEmployee, deptBudget };
