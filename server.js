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
      password: '',
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
function search() {
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
        .then((res) => {
          console.log(res);
          switch (res) {
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
            }
        });

function viewDepartments() {
    
};
        
function viewRoles() {
            
};
        
function viewEmployees() {
        
};

function addDepartment() {
    
};

function addRole() {
    
};

function addEmployee() {

};

function updateEmployeeRole() {
    
};

function updateEmployeeManagers() {
    
};

function removeEmployee() {
}

};

search();