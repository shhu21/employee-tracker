const connection = require('../db/database');

const getDepts = () => {
    connection.promise().query(`SELECT id, name AS Department FROM department;`,
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
        }
    );
}

const getRoles = () => {
    connection.promise().query(
        `SELECT r.id, r.title AS Title, r.salary AS Salary, name AS 'Department' 
            FROM role r 
            LEFT JOIN department d 
            ON r.department_id = d.id;`,
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
        }
    );
}

const getEmployees = () => {
    connection.promise().query(
        `SELECT 
        e.id, 
        CONCAT (e.first_name, ' ', e.last_name) AS Employee, 
        title AS Title, salary AS Salary, 
        name AS 'Department', 
        CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM employee e
            LEFT JOIN role r
            ON e.role_id = r.id
            LEFT JOIN department d
            ON r.department_id = d.id
            LEFT JOIN employee m
            ON e.manager_id = m.id;`,
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
        }
    );
}

const employeesByManager = (manager) => {
    const managerName = manager.split(' ');
    connection.promise().query(
        `SELECT CONCAT (e.first_name, '  ', e.last_name) AS Employee 
            FROM employee m 
            INNER JOIN employee e 
            ON e.manager_id = m.id
            AND m.first_name = '${managerName[0]}'
            AND m.last_name = '${managerName[1]}';`,
        (err, result) => {
            if (err) throw err;
            
            console.log(`\nEmployees under Manager ${manager}:`);
            console.table(result);
        }
    );
}

const employeesByDept = (dept) => {
    connection.promise().query(
        `SELECT name AS Department, CONCAT (first_name, ' ', last_name) AS Employee 
            FROM employee e 
            INNER JOIN role r 
            ON e.role_id = r.id 
            INNER JOIN department d 
            ON r.department_id = d.id 
            AND d.name = '${dept}';`,
        (err, result) => {
            if (err) throw err;
    
            console.log(`\nEmployees under Department ${dept}:`);
            console.table(result);
        }
    );
}

const insertDept = (dept) => {
    connection.promise().query(`INSERT INTO department(name)
        VALUES ('${dept}');`,
        (err, result) => {
            if (err) throw err;
    
            console.log(`\n${dept} was successfully added.`);
        }
    );
}

const insertRole = (role) => {
    connection.promise().query(
        `INSERT INTO role (title, salary, department_id)
        VALUES (
            '${role.role}', 
            ${role.salary}, 
            (SELECT id FROM department
            WHERE name = '${role.dept}');
        )`,
        (err, result) => {
            if (err) throw err;
            
            console.log(`\n${role.role} was successfully added.`);
        }
    );

}

const insertEmployee = (employee) => {
    const manager = employee.manager.split(' ');

    connection.promise().query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (
                '${employee.firstName}', 
                '${employee.lastName}', 
                (SELECT id FROM role
                    WHERE role.title = '${employee.role}'), 
                (SELECT e.id FROM employee e
                        WHERE e.first_name = '${manager[0]}'
                        AND e.last_name = '${managaer[1]}')
            );`,
        (err, result) => {
            if (err) throw err;
                    
            console.log(`\n${employee.firstName} ${employee.lastName} was successfully added.`);
        }
    );

}

const updateEmployeeRole = (employee) => {
    const name = employee.employee.split(' ');

    connection.promise().query(`
        UPDATE employee
            SET role_id = (SELECT id FROM role WHERE title = '${employee.role}')
            WHERE first_name = '${name[0]}'
            AND last_name = '${name[1]}';`,
        (err, result) => {
            if (err) throw err;
    
            console.log(`\n${employee.employee}'s role is now ${employee.role}.`);
        }
    );
}

const updateEmployeeManager = (employee) => {
    const manager = employee.manager.split(' ');

    connection.promise().query(`
        UPDATE employee e
            SET e.manager_id = (SELECT id FROM employee m WHERE m.first_name = '${manager[0]}' AND m.last_name = '${manager[1]}')`,
        (err, result) => {
            if (err) throw err;
    
            console.log(`\n${employee.employee}'s manager is now ${employee.manager}.`);
        }
    );
}

const deleteDept = (dept) => {
    connection.promise().query(`DELETE FROM department WHERE name = '${dept}';`,
        (err, result) => {
            if (err) throw err;

            console.log(`\nDepartment ${dept} has been deleted.`);
        }
    );

}

const deleteRole = (role) => {
    connection.promise().query(`DELETE FROM role WHERE title = '${role}';`,
        (err, result) => {
            if (err) throw err;

            console.log(`\Role ${role} has been deleted.`);
        }
    );
}

const deleteEmployee = (name) => {
    const employee = name.split(' ');

    connection.promise().query(
        `DELETE 
            FROM employee 
            WHERE first_name = '${employee[0]}' 
            AND last_name = '${employee[1]}';`,
        (err, result) => {
            if (err) throw err;

            console.log(`\nEmployee ${name} has been deleted.`);
        }
    );

}

const deptBudget = (dept) => {
    connection.promise().query(
        `SELECT salary 
            FROM employee e 
            INNER JOIN role r 
                ON e.role_id = r.id 
            INNER JOIN department d 
                ON r.department_id = d.id 
                AND d.name = '${dept}';`,
        (err, result) => {
            if (err) throw err;

            let salary = 0;
            result.forEach(res => salary += parseInt(res.salary));

            console.log(`\nThe total utilized budget of Department ${dept} is $${salary}.`);
        }
    );
}

module.exports = { getDepts, getRoles, getEmployees, employeesByManager, employeesByDept, insertDept, insertRole, insertEmployee, updateEmployeeRole, updateEmployeeManager, deleteDept, deleteRole, deleteEmployee, deptBudget };

// TODO: move query strings into new file
