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
      // database name
      database: 'employees_db'
    },
    console.log("***********************************"),
    console.log("*           WELCOME TO            *"),
    console.log("*        EMPLOYEE TRACKER         *"),
    console.log("*                                 *"),
    console.log("***********************************")
  );

search();

  // Function for inquirer to prompt questions
function search() {
  inquirer
      .prompt({
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
              "View all employees",
              "View employees by department",
              "View employees by manager",
              "Add Department",
              "Add employee",
              "Add Role",
              "Update employee role",
              "Update employee managers",
              "Remove employee"              
          ]
        });
      }

