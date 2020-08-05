const inquirer = require('inquirer');
const { initialPrompt, addDeptPrompt, addRolePrompt, addEmployeePrompt } = require('./prompts');
const { getDepts, getRoles, getEmployees, insertDept, insertRole, insertEmployee, updateEmployee } = require('./queries');

const options = () => {
    return inquirer
        .prompt(initialPrompt)
        .then(choice => {
            if(choice.option == 'View all departments') {
                getDepts();
            }
            else if(choice.option == 'View all roles') {
                getRoles();
            }
            else if(choice.option == 'View all employees') {
                getEmployees();
            }
            else if(choice.option == 'Add a department') {
                inquirer
                    .prompt(addDeptPrompt)
                    .then(dept => {
                        insertDept(dept);
                    });
            }
            else if(choice.option == 'Add a role') {
                inquirer
                    .prompt(addRolePrompt)
                    .then(role => {
                        insertRole(role);
                    });
            }
            else if(choice.option == 'Add an employee') {
                inquirer
                    .prompt(addEmployeePrompt)
                    .then(employee => {
                        insertEmployee(employee);
                    });
            }
            else if(choice.option == 'Update an employee role') {
                inquirer
                    .prompt(addDeptPrompt)
                    .then(employee => {
                        updateEmployee(employee);
                    });
            }
            else {
                return;
            }
            options();
        });
}