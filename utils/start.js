const inquirer = require('inquirer');
const connection = require('../db/database');
const { initialPrompt, addDeptPrompt } = require('./prompts');
const { getDepts, getRoles, getEmployees, employeesByManager, employeesByDept, insertDept, insertRole, insertEmployee, updateEmployee, deleteDept, deleteRole, deleteEmployee, deptBudget } = require('./queries');

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
                connection.promise().query(
                    `SELECT DISTINCT CONCAT (m.first_name, ' ', m.last_name) AS manager 
                        FROM employee m 
                        INNER JOIN employee e 
                        ON e.manager_id = m.id;`,
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'Select a manager to view',
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
                connection.promise().query(`SELECT name FROM department;`,
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'dept',
                                message: 'Select a department to view',
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
                connection.promise().query(`SELECT name FROM department;`, 
                    (err, result) => {
                        if (err) throw err;

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'role',
                                    message: 'Enter the name of the role.',
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
                                    message: 'Enter the salary of the role.',
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
                                    message: 'Enter the department of the role.',
                                    choices: result.map(res => res.name)
                                }
                            ])
                            .then(role => {
                                insertRole(role);
                                start();
                            }
                        );
                    }
                );
            }
            else if(choice.option == 'Add an employee') {
                connection.promise().query(
                    `SELECT DISTINCT title, CONCAT(first_name, ' ', last_name) AS 'name' 
                        FROM role r
                        INNER JOIN employee e
                        ON r.id = e.role_id;`, 
                    (err, result) => {
                        if (err) throw err;

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'firstName',
                                    message: 'Enter the employee\'s first name',
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
                                    message: 'Enter the employee\'s last name',
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
                                    message: 'Choose the employee\'s role',
                                    choices: [...new Set(result.map(res => res.title))]
                                },
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: 'Choose the employee\'s manager',
                                    choices: result.map(res => res.name)
                                }
                            ])
                            .then(employee => {
                                insertEmployee(employee);
                                start();
                            }
                        );
                    }
                );
            }
            else if(choice.option == 'Update an employee\'s role') {
                connection.promise().query(
                    `SELECT title, CONCAT(first_name, ' ', last_name) AS 'name' 
                        FROM role r
                        INNER JOIN employee e
                        ON r.id = e.role_id;`,
                    (err, result) => {
                        if (err) throw err;
                        
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'employee',
                                    message: 'Choose the employee to update',
                                    choices: result.map(res => res.name)
                                },
                                {
                                    type: 'list',
                                    name: 'role',
                                    message: 'Choose the role of the employee',
                                    choices: [...new Set(result.map(res => res.title))]
                                }
                            ])
                            .then(employee => {
                                updateEmployeeRole(employee);
                                start();
                            }
                        );
                    }
                );
            }
            else if(choice.option == 'Update an employee\'s manager') {
                connection.promise().query(
                    `SELECT CONCAT (m.first_name, ' ', m.last_name) AS manager, CONCAT (e.first_name, ' ', e.last_name) AS employee 
                        FROM employee e 
                        INNER JOIN employee m
                        ON e.manager_id = m.id;`,
                    (err, result) => {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'employee',
                                    message: 'Choose the employee to update',
                                    choices: result.map(res => res.employee)
                                },
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: 'Choose the manager of the employee',
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
                connection.promise().query(`SELECT name FROM department;`,
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'dept',
                                message: 'Select a department to delete',
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
                connection.promise().query(`SELECT title FROM role;`,
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Select a role to delete',
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
                connection.promise().query(`SELECT CONCAT (first_name, ' ', last_name) AS name FROM employee;`,
                    (err, result) => {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'name',
                                    message: 'Select an employee to delete',
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
                connection.promise().query(`SELECT name FROM department;`,
                (err, result) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'dept',
                                message: 'Select a department\'s budget to view',
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

// TODO : fix UI