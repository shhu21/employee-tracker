const connection = require('../db/database');
const cTable = require('console.table');
const { viewAllDeptsQ, viewAllRolesQ, viewAllEmployeesQ, managerListQ, employeesByManagerQ, deptListQ, employeesByDeptQ, insertDeptQ, insertRoleQ, rolesAndEmployeesQ, insertEmployeeQ, updateRoleQ, employeesAndManagerQ, updateManagerQ, deleteDeptQ, roleListQ, deleteRoleQ, employeeListQ, deleteEmployeeQ, deptSalariesQ } = require('./queries');

// Displays a list of departments
const getDepts = () => {
    connection.promise().query(viewAllDeptsQ(),
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
        });
}

// Displays a list of all roles
const getRoles = () => {
    connection.promise().query(viewAllRolesQ(),
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
        });
}

// Displays a list of all employees
const getEmployees = () => {
    connection.promise().query(viewAllEmployeesQ(),
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
        });
}

// Displays a list of employees by manager
const employeesByManager = (manager) => {
    const managerName = manager.split(' ');
    connection.promise().query(employeesByManagerQ(managerName[0], managerName[1]),
        (err, result) => {
            if (err) throw err;
            
            console.log(`\nEmployees under Manager ${manager}:`);
            console.table(result);
        });
}

// Displays a list of employees by department
const employeesByDept = (dept) => {
    connection.promise().query(employeesByDeptQ(dept),
        (err, result) => {
            if (err) throw err;
    
            console.log(`\nEmployees under Department ${dept}:`);
            console.table(result);
        });
}

// Adds a new department
const insertDept = (dept) => {
    connection.promise().query(insertDeptQ(dept),
        (err, result) => {
            if (err) throw err;
    
            console.log(`\n${dept} was successfully added.`);
        });
}

// Adds a new role
const insertRole = (role) => {
    connection.promise().query(insertRoleQ(role.role, role.salary, role.dept),
        (err, result) => {
            if (err) throw err;
            
            console.log(`\n${role.role} was successfully added.`);
        });
}

// Adds a new employee
const insertEmployee = (employee) => {
    const manager = employee.manager.split(' ');

    connection.promise().query(insertEmployeeQ(employee.firstName, employee.lastName, employee.role, manager[0], manager[1]),
        (err, result) => {
            if (err) throw err;
                    
            console.log(`\n${employee.firstName} ${employee.lastName} was successfully added.`);
        });
}

// Updates an employee's role
const updateEmployeeRole = (employee) => {
    const name = employee.employee.split(' ');

    connection.promise().query(updateRoleQ(employee.role, name[0], name[1]),
        (err, result) => {
            if (err) throw err;
    
            console.log(`\n${employee.employee}'s role is now ${employee.role}.`);
        });
}

// Updates an employee's manager
const updateEmployeeManager = (employee) => {
    const manager = employee.manager.split(' ');

    connection.promise().query(updateManagerQ(manager[0], manager[1]),
        (err, result) => {
            if (err) throw err;
    
            console.log(`\n${employee.employee}'s manager is now ${employee.manager}.`);
        });
}

// Deletes a department
const deleteDept = (dept) => {
    connection.promise().query(deleteDeptQ(dept),
        (err, result) => {
            if (err) throw err;

            console.log(`\nDepartment ${dept} has been deleted.`);
        });
}

// Deletes a role
const deleteRole = (role) => {
    connection.promise().query(deleteRoleQ(role),
        (err, result) => {
            if (err) throw err;

            console.log(`\Role ${role} has been deleted.`);
        });
}

// Deletes an employee
const deleteEmployee = (name) => {
    const employee = name.split(' ');

    connection.promise().query(deleteEmployeeQ(employee[0], employee[1]),
        (err, result) => {
            if (err) throw err;

            console.log(`\nEmployee ${name} has been deleted.`);
        });
}

// Displays a department's budget
const deptBudget = (dept) => {
    connection.promise().query(deptSalariesQ(dept),
        (err, result) => {
            if (err) throw err;

            let salary = 0;
            result.forEach(res => salary += parseInt(res.salary));

            console.log(`\nThe total utilized budget of Department ${dept} is $${salary}.`);
        });
}

module.exports = { getDepts, getRoles, getEmployees, employeesByManager, employeesByDept, insertDept, insertRole, insertEmployee, updateEmployeeRole, updateEmployeeManager, deleteDept, deleteRole, deleteEmployee, deptBudget };
