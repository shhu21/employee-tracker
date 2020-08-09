require('dotenv').config()
const connection = require('./db/database');
const start = require('./utils/start');

connection.connect(err => {
    if (err) throw err;
    console.log('connected');
    afterConnection();
});
  
afterConnection = () => {
    // start the prompts
    start();
};