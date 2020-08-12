const inquirer = require('inquirer');
const connection = require('../db/database');
const { viewAllDeptsQ, viewAllRolesQ, viewAllEmployeesQ, managerListQ, employeesByManagerQ, deptListQ, employeesByDeptQ, insertDeptQ, insertRoleQ, rolesAndEmployeesQ, insertEmployeeQ, updateRoleQ, employeesAndManagerQ, updateManagerQ, deleteDeptQ, roleListQ, deleteRoleQ, employeeListQ, deleteEmployeeQ, deptSalariesQ } = require('./queries');
const { getDepts, getRoles, getEmployees, employeesByManager, employeesByDept, insertDept, insertRole, insertEmployee, updateEmployeeRole, updateEmployeeManager, deleteDept, deleteRole, deleteEmployee, deptBudget } = require('./accessDB');

const initialPrompt = () => {
    return [
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager',
                'View employees by department',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee\'s role',
                'Update an employee\'s manager',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View the total utilized budget of a department',
                'Quit'
            ]
        }
    ];
}

const viewEmployeesByManager = (start) => {
    connection.promise().query(managerListQ(),
        (err, result) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Select a manager to view:',
                        choices: result.map(res => res.manager).filter(res => res !== null)
                    }
                ])
                .then(manager => {
                    employeesByManager(manager.manager).then(() => start());
                }
            );
        });
}

const viewEmployeesByDept = (start ) => {
    connection.promise().query(deptListQ(),
        (err, result) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'dept',
                        message: 'Select a department to view:',
                        choices: result.map(res => res.name).filter(res => res !== null)
                    }
                ])
                .then(dept => {
                    employeesByDept(dept.dept).then(() => start());
                }
            );
        });
}

const addDept = (start) => {
    return inquirer
        .prompt([
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
        ])
        .then(dept => {
            insertDept(dept.dept).then(() => start());
        });
}

const addRole = (start) => {
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
                        choices: result.map(res => res.name).filter(res => res !== null)
                    }
                ])
                .then(role => {
                    insertRole(role).then(() => start()); 
                });
        });
}

const addEmployee = (start) => {
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
                        choices: [...new Set(result.map(res => res.title).filter(res => res !== null))]
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Select the employee\'s manager:',
                        choices: result.map(res => res.name).filter(res => res !== null)
                    }
                ])
                .then(employee => {
                    insertEmployee(employee).then(() => start());
                });
        });
}

const updateRole = (start) => {
    connection.promise().query(rolesAndEmployeesQ(),
        (err, result) => {
            if (err) throw err;
            
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Select the employee to update:',
                        choices: result.map(res => res.name).filter(res => res !== null)
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Select the role of the employee:',
                        choices: [...new Set(result.map(res => res.title).filter(res => res !== null))]
                    }
                ])
                .then(employee => {
                    updateEmployeeRole(employee).then(() => start());
                });
        });
}

const updateManager = (start) => {
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
                    updateEmployeeManager(employee).then(() => start());
                }
            );
        });
}

const deleteDepartment = (start) => {
    connection.promise().query(deptListQ(),
        (err, result) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'dept',
                        message: 'Select a department to delete:',
                        choices: result.map(res => res.name).filter(res => res !== null)
                    }
                ])
                .then(dept => {
                    deleteDept(dept.dept).then(() => start());
                }
            );
        });
}

const deleteRoles = (start) => {
    connection.promise().query(roleListQ(),
        (err, result) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Select a role to delete:',
                        choices: result.map(res => res.title).filter(res => res !== null)
                    }
                ])
                .then(role => {
                    deleteRole(role.role).then(() => start());
                }
            );
        });
}

const deleteEmployees = (start) => {
    connection.promise().query(employeeListQ(),
        (err, result) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'name',
                        message: 'Select an employee to delete:',
                        choices: result.map(res => res.name).filter(res => res !== null)
                    }
                ])
                .then(employee => {
                    deleteEmployee(employee.name).then(() => start());
                }
            );
        });
}

const departmentBudget = (start) => {
    connection.promise().query(deptListQ(),
        (err, result) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'dept',
                        message: 'Select a department\'s budget to view:',
                        choices: result.map(res => res.name).filter(res => res !== null)
                    }
                ])
                .then(dept => {
                    deptBudget(dept.dept).then(() => start());
                }
            );
        });
}

module.exports = { initialPrompt, viewEmployeesByManager, viewEmployeesByDept, addDept, addRole, addEmployee, updateRole, updateManager, deleteDepartment, deleteRoles, deleteEmployees, departmentBudget };