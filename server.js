require('dotenv').config()
const connection = require('./db/database');
const start = require('./utils/start');
const { deptList, roleList, employeeList } = require('./utils/getLists');

connection.connect(err => {
    if (err) throw err;
    console.log('connected');
    afterConnection();
  });
  
afterConnection = () => {
    start();
    // const list = deptList()
    // console.log(list)
    // connection.end();
};