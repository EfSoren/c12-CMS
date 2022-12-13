const inquirer = require('inquirer');
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'management_db'
    },
    console.log('Connecting to the management database.')
);

const startUp = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a Role', 'Add an employee', 'Update an employees role'],
            name: 'startChoice'
        }
    ]).then((results) => {
       //REFORMAT DB QUERIES
        let choiceResponse;
        switch(results.startChoice)
        {
            case 'View all departments':
                db.query('SELECT * FROM departments', function (err, results) {
                    console.table(results);
                    bootMain()
                     });
                break;
            case 'View all roles':
                db.query('SELECT * FROM roles', function (err, results) {
                    console.table(results);
                    bootMain()
                     });
                break;
            case 'View all employees':
                db.query('SELECT * FROM employees', function (err, results) {
                    console.table(results);
                    bootMain()
                     });
                break;
            case 'Add a department':
                inquirer.prompt(deptQues).then((res) => {
                    db.query(`INSERT INTO departments(department_name) VALUES ('${res.deptName}')`, (err, results) => {
                        if(err) throw err;
                    })
                    db.query('SELECT * FROM departments', function (err, results) {
                        console.table(results);
                        bootMain()
                        })

                });
                break;
            case 'Add a Role':
                inquirer.prompt(roleQues).then((res) => {
                    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ('${res.roleTitle}', ${res.roleSalary}, ${res.deptId})`, (err, results) => {
                        if(err) throw err;
                    })
                    db.query('SELECT * FROM roles', function (err, results) {
                        console.table(results);
                        bootMain()
                        })

                });
                break;
            case 'Add an employee':
                inquirer.prompt(employeeQues).then((res) => {
                    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${res.firstName}', '${res.lastName}', ${res.roleId}, ${res.managerId})`, (err, results) => {
                        if(err) throw err;
                    })
                    db.query('SELECT * FROM employees', function (err, results) {
                        console.table(results);
                        bootMain()
                        })

                });
                break;
            case 'Update an employees role':
                inquirer.prompt(updateQues).then((res) => {
                    db.query(`UPDATE employees SET role_id=${res.newRole} WHERE first_name='${res.findEmployee}'`, (err, results) => {
                        if(err) throw err;
                    })
                    db.query('SELECT * FROM employees', function (err, results) {
                        console.table(results);
                        bootMain()
                        })
                })
        }
        
    }
)}
const bootMain = () => {
    inquirer.prompt([
        {type: 'confirm',
         message: 'Would you like to continue?',
         name: 'restartCheck'
        }]).then((res) =>{
            if(res.restartCheck == true){
                startUp()
            }
            
        })
    }
const deptQues = [
    {
        type: 'input',
        message: 'What is the new department name?',
        name: 'deptName'
    }
]

const roleQues = [
    {
        type: 'input',
        message: 'What is the role title',
        name: 'roleTitle'
    },
    {
        type: 'number',
        message: 'What is this roles salary',
        name: 'roleSalary'
    },
    {
        type: 'input',
        message: 'What is the department id for this role',
        name: 'deptId'
    },
]

const employeeQues = [
    {
        type: 'input',
        message: 'What is the employees first name',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'What is the employees last name',
        name: 'lastName'
    },
    {
        type: 'number',
        message: 'What is this employees role id',
        name: 'roleId'
    },
    {
        type: 'number',
        message: `What is the manager of this employee's id`,
        name: 'managerId'
    }
]
const updateQues = [
    {
        type: 'input',
        message: 'What is this employees first name?',
        name: 'findEmployee'
    },
    {
        type: 'number',
        message: 'What is this employees new role id?',
        name: 'newRole'
    }
]
module.exports = {startUp}