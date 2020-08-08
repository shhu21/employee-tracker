const connection = require('../db/database');

const getDepts = () => {
    connection.promise().query(`SELECT * FROM department;`,
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
    });
}

const getRoles = () => {
    connection.promise().query(
        `SELECT r.id, r.title, r.salary, name AS 'Department' 
            FROM role r 
            LEFT JOIN department d 
            ON r.department_id = d.id;`,
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
    });
}

const getEmployees = () => {
    connection.promise().query(
        `SELECT e.id, e.first_name, e.last_name, title, salary, name AS 'Department', CONCAT(m.first_name, m.last_name) AS 'Manager'
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
    });
}

const insertDept = (dept) => {
    connection.promise().query(`INSERT INTO department(name)
        VALUES ('${dept}');`,
        (err, result) => {
            if (err) throw err;
    
            console.log('\nDepartment successfully added.');
    });
}

const insertRole = (role) => {
    connection.promise().query(`INSERT INTO role (title, salary, department_id)
        VALUES (
            '${role.role}', 
            ${role.salary}, 
            (SELECT id FROM department
            WHERE name = '${role.dept}';
        )`,
        (err, result) => {
            if (err) throw err;
            
            console.log('\nRole successfully added.');
    });

}

const insertEmployee = (employee) => {
    const manager = employee.manager.split(' ');

    connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
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
                    
                console.log('\nEmployee successfully added.');
        });

}

const updateEmployee = (employee) => {
    const name = employee.split(' ');
    connection.promise().query(`UPDATE employee
        SET role_id = (SELECT id FROM role WHERE title = ${employee.role})
        WHERE employee.first_name = '${name[0]}'
        AND employee.last_name = '${name[1]}';`,
        (err, result) => {
            if (err) throw err;
    
                console.log('\nEmployee successfully updated.');
            });
}

module.exports = { getDepts, getRoles, getEmployees, insertDept, insertRole, insertEmployee, updateEmployee };
