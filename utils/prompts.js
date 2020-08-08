// Prompts

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

module.exports = { initialPrompt, addDeptPrompt };