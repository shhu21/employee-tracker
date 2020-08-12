const inquirer = require('inquirer');
const connection = require('../db/database');
// Prompts
const { initialPrompt, viewEmployeesByManager, viewEmployeesByDept, addDept, addRole, addEmployee, updateRole, updateManager, deleteDepartment, deleteRoles, deleteEmployees, departmentBudget } = require('./prompts');
// Callback functions to access/update the database
const { getDepts, getRoles, getEmployees } = require('./accessDB');

const start = () => {
    return inquirer
        .prompt(initialPrompt())
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
                viewEmployeesByManager(start);
            }
            else if(choice.option == 'View employees by department') {
                viewEmployeesByDept(start);
            }
            else if(choice.option == 'Add a department') {
                addDept(start);
            }
            else if(choice.option == 'Add a role') {
                addRole(start);
            }
            else if(choice.option == 'Add an employee') {
                addEmployee(start);
            }
            else if(choice.option == 'Update an employee\'s role') {
                updateRole(start);
            }
            else if(choice.option == 'Update an employee\'s manager') {
                updateManager(start);
            }
            else if(choice.option == 'Delete a department') {
                deleteDepartment(start);
            }
            else if(choice.option == 'Delete a role') {
                deleteRoles(start);
            }
            else if(choice.option == 'Delete an employee') {
                deleteEmployees(start);
            }
            else if(choice.option == 'View the total utilized budget of a department') {
                departmentBudget(start);
            }
            else {
                connection.end();
                return;
            }
        });
}

module.exports = start;