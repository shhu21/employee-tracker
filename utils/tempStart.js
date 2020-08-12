viewEmployeesByManager(start);
                // start();

const viewEmployeesByManager = (start) => {
    connection.promise().query(managerListQ(),
        (err, result) => {
            console.log(result)
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Select a manager to view:',
                        choices: result.map(res => res.manager)
                    }
                ])
                .then(manager => {
                    employeesByManager(manager.manager).then(() => start());
                }
            );
        });
}

// Displays a list of employees by manager
const employeesByManager = (manager) => {
    const managerName = manager.split(' ');
    return connection.promise().query(employeesByManagerQ(managerName[0], managerName[1]))
    .then(([rows]) => {
        
        console.log(`\nEmployees under Manager ${manager}:`);
        console.table(rows);
    })
}