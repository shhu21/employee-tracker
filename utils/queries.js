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
    
            console.log('Department successfully added.');
    });
}

const insertRole = (role) => {
    const deptId = connection.promise().query(`SELECT id FROM department
                WHERE dept.name = ${role.dept};`,
                (err, result) => {
                    if (err) throw err;
            
                    return result[0].id;
    });

    connection.promise().query(`INSERT INTO role
        VALUES (${role.role}, ${role.salary}, ${deptId});`,
        (err, result) => {
            if (err) throw err;
    
            console.log('Role successfully added.');
    });
}

const insertEmployee = (employee) => {
    const roleId = connection.promise().query(`SELECT id FROM role
                WHERE role.title = ${employee.role}`,
                (err, result) => {
                    if (err) throw err;
            
                    return result[0].id;
    });

    const managerId = connection.promise().query(`SELECT id FROM employee
                WHERE employee.first_name = ${employee.firstName}
                AND employee.last_name = ${employee.lastName};`,
                (err, result) => {
                    if (err) throw err;
            
                    return result[0].id;
    });

    connection.promise().query(`INSERT INTO employee
        VALUES (${employee.firstName}, ${employee.lastName}, ${roleId}, ${managerId});`,
        (err, result) => {
            if (err) throw err;
    
            console.log('Employee successfully added.');
    });

}

const updateEmployee = (employee) => {
    const name = employee.split(' ');
    const roleId = connection.promise().query(`SELECT id FROM role
                WHERE role.title = ${employee.role}`,
                (err, result) => {
                    if (err) throw err;
            
                    return result[0].id;
    });

    connection.promise().query(`UPDATE employee
        SET role_id = ${roleId}
        WHERE employee.first_name = ${name[0]}
        AND employee.last_name = ${name[1]};`,
        (err, result) => {
            if (err) throw err;
    
            console.log('Employee successfully updated.');
    });

}

module.exports = { getDepts, getRoles, getEmployees, insertDept, insertRole, insertEmployee, updateEmployee };
