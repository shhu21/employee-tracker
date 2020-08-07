const inquirer = require('inquirer');
const { initialPrompt, addDeptPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt } = require('./prompts');
const { getDepts, getRoles, getEmployees, insertDept, insertRole, insertEmployee, updateEmployee } = require('./queries');
const connection = require('../db/database');

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
                        });
                });
            }
            else if(choice.option == 'Add an employee') {
                inquirer
                    .prompt(addEmployeePrompt)
                    .then(employee => {
                        insertEmployee(employee);
                        start();
                    });
            }
            else if(choice.option == 'Update an employee role') {
                inquirer
                    .prompt(updateEmployeePrompt)
                    .then(employee => {
                        updateEmployee(employee);
                        start();
                    });
            }
            else {
                connection.end();
                return;
            }
        });
}

module.exports = start;