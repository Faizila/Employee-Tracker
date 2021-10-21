// Dependencies
const mysql = require('mysql2');
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3306,
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '123456',
      database: 'employees_db'
    },
    console.log("***********************************"),
    console.log("*           WELCOME TO            *"),
    console.log("*        EMPLOYEE TRACKER         *"),
    console.log("*                                 *"),
    console.log("***********************************")
  );

