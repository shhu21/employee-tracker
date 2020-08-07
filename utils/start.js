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
                inquirer
                    .prompt(addRolePrompt)
                    .then(role => {
                        insertRole(role);
                        start();
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