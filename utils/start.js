const inquirer = require('inquirer');
const connection = require('../db/database');
// Prompts
const { initialPrompt, addDeptPrompt } = require('./prompts');
// Callback functions to access/update the database
const { getDepts, getRoles, getEmployees, employeesByManager, employeesByDept, insertDept, insertRole, insertEmployee, updateEmployeeRole, updateEmployeeManager, deleteDept, deleteRole, deleteEmployee, deptBudget } = require('./accessDB');
// query strings
const { viewAllDeptsQ, viewAllRolesQ, viewAllEmployeesQ, managerListQ, employeesByManagerQ, deptListQ, employeesByDeptQ, insertDeptQ, insertRoleQ, rolesAndEmployeesQ, insertEmployeeQ, updateRoleQ, employeesAndManagerQ, updateManagerQ, deleteDeptQ, roleListQ, deleteRoleQ, employeeListQ, deleteEmployeeQ, deptSalariesQ } = require('./queries');

const start = () => {
    return inquirer
        .prompt(initialPrompt)
        .then(choice => {
            if(choice.option == 'View all departments') {
                getDepts();
                start();
            }
            else if(choice.option == 'View all roles') {
                getRoles();
                start();
            }
            else if(choice.option == 'View all employees') {
                getEmployees();
                start();
            }
            else if(choice.option == 'View employees by manager') {
                connection.promise().query(managerListQ(),
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'Select a manager to view:',
                                choices: result.map(res => res.manager)
                            }
                        ])
                        .then(manager => {
                            employeesByManager(manager.manager);
                            start();
                        }
                    );
                });
            }
            else if(choice.option == 'View employees by department') {
                connection.promise().query(deptListQ(),
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'dept',
                                message: 'Select a department to view:',
                                choices: result.map(res => res.name)
                            }
                        ])
                        .then(dept => {
                            employeesByDept(dept.dept);
                            start();
                        }
                    );
                });
            }
            else if(choice.option == 'Add a department') {
                inquirer
                    .prompt(addDeptPrompt)
                    .then(dept => {
                        insertDept(dept.dept);
                        start();
                    });
            }
            else if(choice.option == 'Add a role') {
                connection.promise().query(deptListQ(), 
                    (err, result) => {
                        if (err) throw err;

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'role',
                                    message: 'Enter the name of the role:',
                                    validate: input => {
                                        if (input) {
                                            return true;
                                        } else {
                                            console.log('\nPlease enter the name of the role.');
                                            return false;
                                        }
                                    }
                                },
                                {
                                    type: 'input',
                                    name: 'salary',
                                    message: 'Enter the salary of the role:',
                                    validate: input => {
                                        if (input) {
                                            return true;
                                        } else {
                                            console.log('\nPlease enter the salary of the role.');
                                            return false;
                                        }
                                    }
                                },
                                {
                                    type: 'list',
                                    name: 'dept',
                                    message: 'Select the department of the role:',
                                    choices: result.map(res => res.name)
                                }
                            ])
                            .then(role => {
                                insertRole(role);
                                start();
                            });
                    });
            }
            else if(choice.option == 'Add an employee') {
                connection.promise().query(rolesAndEmployeesQ(), 
                    (err, result) => {
                        if (err) throw err;

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'firstName',
                                    message: 'Enter the employee\'s first name:',
                                    validate: input => {
                                        if (input) {
                                            return true;
                                        } else {
                                            console.log('\nPlease enter the first name of the employee.');
                                            return false;
                                        }
                                    }
                                },
                                {
                                    type: 'input',
                                    name: 'lastName',
                                    message: 'Enter the employee\'s last name:',
                                    validate: input => {
                                        if (input) {
                                            return true;
                                        } else {
                                            console.log('\nPlease enter the last name of the employee.');
                                            return false;
                                        }
                                    }
                                },
                                {
                                    type: 'list',
                                    name: 'role',
                                    message: 'Select the employee\'s role:',
                                    choices: [...new Set(result.map(res => res.title))]
                                },
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: 'Select the employee\'s manager:',
                                    choices: result.map(res => res.name)
                                }
                            ])
                            .then(employee => {
                                insertEmployee(employee);
                                start();
                            });
                    });
            }
            else if(choice.option == 'Update an employee\'s role') {
                connection.promise().query(rolesAndEmployeesQ(),
                    (err, result) => {
                        if (err) throw err;
                        
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'employee',
                                    message: 'Select the employee to update:',
                                    choices: result.map(res => res.name)
                                },
                                {
                                    type: 'list',
                                    name: 'role',
                                    message: 'Select the role of the employee:',
                                    choices: [...new Set(result.map(res => res.title))]
                                }
                            ])
                            .then(employee => {
                                updateEmployeeRole(employee);
                                start();
                            });
                    });
            }
            else if(choice.option == 'Update an employee\'s manager') {
                connection.promise().query(employeesAndManagerQ(),
                    (err, result) => {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'employee',
                                    message: 'Select the employee to update:',
                                    choices: result.map(res => res.employee)
                                },
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: 'Select the manager of the employee:',
                                    choices: [...new Set(result.map(res => res.manager))]
                                }
                            ])
                            .then(employee => {
                                updateEmployeeManager(employee);
                                start();
                            }
                        );
                    });
            }
            else if(choice.option == 'Delete a department') {
                connection.promise().query(deptList(),
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'dept',
                                message: 'Select a department to delete:',
                                choices: result.map(res => res.name)
                            }
                        ])
                        .then(dept => {
                            deleteDept(dept.dept);
                            start();
                        }
                    );
                });
            }
            else if(choice.option == 'Delete a role') {
                connection.promise().query(roleListQ(),
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Select a role to delete:',
                                choices: result.map(res => res.title)
                            }
                        ])
                        .then(role => {
                            deleteRole(role.role);
                            start();
                        }
                    );
                });
            }
            else if(choice.option == 'Delete an employee') {
                connection.promise().query(employeeListQ(),
                    (err, result) => {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'name',
                                    message: 'Select an employee to delete:',
                                    choices: result.map(res => res.name)
                                }
                            ])
                            .then(employee => {
                                deleteEmployee(employee.name);
                                start();
                            }
                        );
                    });
            }
            else if(choice.option == 'View the total utilized budget of a department') {
                connection.promise().query(deptListQ(),
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'dept',
                                message: 'Select a department\'s budget to view:',
                                choices: result.map(res => res.name)
                            }
                        ])
                        .then(dept => {
                            deptBudget(dept.dept);
                            start();
                        }
                    );
                });
            }
            else {
                connection.end();
                return;
            }
        });
}

module.exports = start;