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
    connection.promise().query(`SELECT * FROM role;`,
        (err, result) => {
            if (err) throw err;
            console.log('\n');
            console.table(result);
    });
}

const getEmployees = () => {
    connection.promise().query(`SELECT * FROM employee;`,
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
    connection.promise().query(`SELECT id FROM department
        WHERE name = '${role.dept}';`,
        (err, result) => {
            if (err) throw err;
    
            connection.promise().query(`INSERT INTO role (title, salary, department_id)
                VALUES ('${role.role}', ${role.salary}, ${result[0].id});`,
                (err, result) => {
                    if (err) throw err;
            
                    console.log('\nRole successfully added.');
            });
    });

}

const insertEmployee = (employee) => {
    connection.promise().query(`SELECT id FROM role
        WHERE role.title = ${employee.role}`,
        (err, result) => {
            if (err) throw err;
    
            connection.promise().query(`SELECT id FROM employee
                WHERE employee.first_name = ${employee.firstName}
                AND employee.last_name = ${employee.lastName};`,
                (err, result1) => {
                    if (err) throw err;
            
                    connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES ('${employee.firstName}', '${employee.lastName}', ${result[0].id}, ${result1[0].id});`,
                        (err, result2) => {
                            if (err) throw err;
                    
                            console.log('\nEmployee successfully added.');
                    });
            });
    });



}

const updateEmployee = (employee) => {
    const name = employee.split(' ');
    connection.promise().query(`SELECT id FROM role
        WHERE role.title = ${employee.role}`,
        (err, result) => {
            if (err) throw err;
    
            connection.promise().query(`UPDATE employee
                SET role_id = ${result[0].id}
                WHERE employee.first_name = '${name[0]}'
                AND employee.last_name = '${name[1]}';`,
                (err, result) => {
                    if (err) throw err;
            
                    console.log('\nEmployee successfully updated.');
            });
    });


}

module.exports = { getDepts, getRoles, getEmployees, insertDept, insertRole, insertEmployee, updateEmployee };
