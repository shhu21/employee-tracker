// User Prompts
// const { deptList, roleList, employeeList } = require('./getLists');

const initialPrompt = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    }
];

const addDeptPrompt = [
    {
        type: 'input',
        name: 'dept',
        message: 'Enter the name of the department.',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('\nPlease enter the name of the department.');
                return false;
            }
        }
    }
];

const addRolePrompt = [
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
        choices: []
    }
];

const addEmployeePrompt = [
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
        choices: []
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Choose the employee\'s manager',
        choices: []
    }
];

const updateEmployeePrompt = [
    {
        type: 'list',
        name: 'employee',
        message: 'Choose the employee to update',
        choices: []
    },
    {
        type: 'list',
        name: 'role',
        message: 'Choose the role of the employee',
        choices: []
    }
]

module.exports = { initialPrompt, addDeptPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt };