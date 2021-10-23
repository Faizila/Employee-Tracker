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
    console.log("*   EMPLOYEE MANAGEMENT SYSTEM    *"),
    console.log("*                                 *"),
    console.log("***********************************")
  );

  // Function for inquirer to prompt questions
const search = () => {
  inquirer
      .prompt({
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
              "View all Departments",
              "View all Roles",
              "View all Employees",
              "Add Department",
              "Add Role",
              "Add Employee",
              "Update an Employee Role",
              "Update Employee Managers",
              "Remove an Employee",
              "EXIT"              
          ]
        })
        .then((answer) => {
               console.log(answer.action);
          switch (answer.action) {
              case 'View all Departments':
                  viewDepartments();
              break;
              case 'View all Roles':
                  viewRoles();
              break;
              case 'View all Employees':
                  viewEmployees();
              break;
              case 'Add Department':
                  addDepartment();
              break;
              case 'Add Role':
                  addRole();
              break;
              case 'Add Employee':
                  addEmployee();
              break;
              case 'Update an Employee Role':
                  updateEmployeeRole();
              break;
              case 'Update Employee Managers':
                  updateEmployeeManagers();
              break;
              case 'Remove an Employee':
                  removeEmployee();
              break;
              case 'EXIT':
                  console.log('Finish!');
              break;
              default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });

// Query database
function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
  // Display query results using console.table
  console.table(results);
  });  
  search(); 
};
        
function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
  console.table(results);
  });       
  search();    
};
        
function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
  console.table(results);
  });
  search();   
};

function addDepartment() {
 
  search(); 
};

function addRole() {
    
  search(); 
};

function addEmployee() {

  search(); 
};

function updateEmployeeRole() {
    
  search(); 
};

function updateEmployeeManagers() {
    
  search(); 
};

function removeEmployee() {

  search(); 
}

};

search();