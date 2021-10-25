// Dependencies
const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
     // host
      host: 'localhost',
     // port
      port: 3306,
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '123456',
      // database name
      database: 'employees_db'
    },
    // UI
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
        // choices for user
          choices: [
              "View all Departments",
              "View all Roles",
              "View all Employees",
              "Add Department",
              "Add Role",
              "Add Employee",
              "Update an Employee Role",
              "View Employees By Department",
              "Remove Department",
              "View Department Budget",
              "EXIT"              
          ]
        })
        // promise
        .then((answer) => {
            // switch statement
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
              case 'View Employees By Department':
                viewEmployeesByDepartment();
              break;
              case 'Remove Department':
                  removeDepartment();
              break;
              case 'View Department Budget':
                  viewDepartmentBudget();
              break;
              case 'EXIT':
                  console.log('Thank You!');
              break;
            // default
              default:
                  console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });


// function to view all departments
function viewDepartments() {
   // Query database to view department table
  db.query('SELECT * FROM department', function (err, results) {
  console.log("\nAll Departments\n");
  // Display query results in table format using console.table
  console.table(results);
  }); 
 // calling function    
  search(); 
};

// function to view all roles
function viewRoles() {
  // Query database to view role table
  db.query('SELECT * FROM role', function (err, results) {
  console.log("\nAll Roles\n");    
  // Display results in table format
  console.table(results);
  });       
// calling function
  search();    
};

// view all employees
function viewEmployees() {
    // Query database to view employee table
    db.query('SELECT * FROM employee', function (err, results) {
    console.log("\nAll Employees\n");
    // Display results in table format
    console.table(results);
  });
// calling function
  search();   
};

// function to add a department
function addDepartment() {
    // inquirer to prompt questions
    inquirer
  .prompt([{
      name: "title",
      type: "input",
      message: "What is the name of new Department?",
  }, 
])
// promise
  .then((answers) => {
      // Query database to insert value in department table
      db.query(`INSERT INTO department (name) VALUES ("${answers.title}")`, (err, data) => {
        // catch error 
        if (err) throw err;
              console.log("\nNew department added!\n");
            // calling function
              search();
          }
      );
  });
};

// add a role
function addRole() {
  // Query database to select id and name from department table
  db.query("SELECT id, name FROM department", (err, res) => {
   // catch error    
    if (err) throw err;
    // map
    const dept = res.map((department) => {
        return {
            name: department.name,
            value: department.id,
        };
    });
    // inquirer to prompt questions
    inquirer
        .prompt([{
                name: "title",
                type: "list",
                message: "What is employee's role?",
                choices: ['Web Developer',
                          'Accountant',
                          'Paralegal',
                          'Manager',
                          'Engineer',
                          'Sales Rep']
            },
            {
                name: "salary",
                type: "input",
                message: "What is the employees's salary?",
            },
            {
                name: "department",
                type: "list",
                message: "What is the name of employee's department?",
                choices: dept,
            },
        ])
        // promise
        .then((answers) => {
            // Query database to insert in role table
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${answers.department})`, (err, data) => {
                // catch error 
                if (err) throw err;
                    console.log("\nEmployee role added!\n");
                    // calling function
                    search();
                }
            );
        });
});   
 
};

// function to add an employee
function addEmployee() {
    // Query database to select id and title from role table
  db.query("SELECT id, title FROM role", (err, res) => {
    // catch error
    if (err) throw err;
    // map
    const role = res.map((role) => {
        return {
            name: role.title,
            value: role.id,
        };
    });
    // inquirer to prompt questions
    inquirer
        .prompt([{
                name: "first_name",
                type: "input",
                message: "What is employee first name?",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is employee last name?",
            },
            {
                name: "role",
                type: "list",
                message: "What is employee's role?",
                choices: role,
            },
            {
                name: "manager",
                type: "input",
                message: "Who is their manager(id format):",
            },
        ])
        // promise
        .then((answers) => {
            // query database to insert in employee table
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role}, ${answers.manager})`, (err, data) => {
                // catch error   
                if (err) throw err;
                console.log("\nEmployee added!\n");
                // calling function
                search();
                }
            );
        });
});
};

// function to update an employee role
function updateEmployeeRole() {
    // Query database and doing Concatenation
    db.query("select*,a.id as empID, concat(first_name, \" \", last_name) as concatName from employee a left join role b on a.role_id = b.id", (err, res) => {
    if (err) throw err;
    // map
    const employeeUpdate = res.map((employeeUpdate) => {
        return {
            name: employeeUpdate.concatName,
            value: employeeUpdate.empID,
        };
    });
    // map
    const roleUpdate = res.map((roleUpdate) => {
        return {
            name: roleUpdate.title,
            value: roleUpdate.id,
        };
    });
    // inquirer to prompt questions
    inquirer
        .prompt([{
                name: "employee",
                type: "list",
                message: "Which employee do you want to update?",
                choices: employeeUpdate,
            },
            {
                name: "newRole",
                type: "list",
                message: "What is employee's new role?",
                choices: roleUpdate,
            },
        ])
        .then((answers) => {
            // Query database and updating employee role
            db.query(`UPDATE employee SET role_id = ${answers.newRole} where employee.id = ${answers.employee}`, (err, data) => {
                // catch error 
                if (err) throw err;
                console.log("\nEmployee's new role updated!\n");
                // calling function
                search();
                }
            );
        });
});
};

// function to view employees by department
function viewEmployeesByDepartment() {
    // joining tables
    const vebd = `SELECT employee.first_name AS firstName, 
                        employee.last_name AS lastName, 
                        department.name AS Department
                 FROM employee 
                 LEFT JOIN role ON employee.role_id = role.id 
                 LEFT JOIN department ON role.department_id = department.id`;
    // Query database
    db.query(vebd, (err, res) => {
        // catch error
        if (err) throw err; 
      console.log("\nEmployees by Department\n");
    // Display results in table format
      console.table(res); 
    // calling function
      search();
    });          
};

// function to delete Department
function removeDepartment() {
    // Query database select id and name from department
  db.query("SELECT id, name FROM department", (err, res) => {
    // catch error
    if (err) throw err;
    // map
    const dept = res.map((department) => {
        return {
            name: department.name,
            value: department.id,
        };
    });
    // inquirer to prompt questions
    inquirer
        .prompt([{
            type: "list",
            name: "removeDepartment",
            choices: dept,
            message: "Which department would you like to remove?",
        }, 
    ])
        .then((answers) => {
          // Query database delete from department table
          db.query(`DELETE FROM department WHERE id = ${answers.removeDepartment}`, (err, data) => {
            // catch error 
            if (err) throw err;
            console.log("\nDepartment Removed!\n");
            // calling function
            search();
                }
            );
        });
}); 
}
};

// function to view department overall budget
function viewDepartmentBudget(){
    // JOIN & GROUP BY
    const vdb = `SELECT department_id AS Id, 
                        department.name AS Department,
                        SUM(salary) AS Budget
                 FROM  role  
                 JOIN department ON role.department_id = department.id GROUP BY department_id`;
    // Query database
    db.query(vdb, (err, rows) => {
    // catch error
      if (err) throw err;
      console.log("\nDepartment Budget\n"); 
      // Display results in table format
      console.table(rows);
    // calling function
      search(); 
    });     
};

// calling search function
search();