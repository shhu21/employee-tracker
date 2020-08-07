const connection = require('../db/database');
const { initialPrompt, addDeptPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt } = require('./prompts');
const deptList = () => {
    connection.promise().query(`SELECT name FROM department;`, 
    (err, result) => {
        if (err) throw err;

        return result.map(res => res.name);
    });
};

const roleList = () => {
    connection.promise().query(`SELECT title FROM role;`, 
    (err, result) => {
        if (err) throw err;

        return result;
    });
};


const employeeList = () => {
    connection.query(`SELECT first_name, last_name FROM employee;`, 
    (err, result) => {
        if (err) throw err;

        result.forEach(employee => `${employee.first_name} ${employee.last_name}`);

        return result;
    })
};

module.exports = { deptList, roleList, employeeList };