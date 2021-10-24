// Dependencies
const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table');

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
              "View Employees By Department",
              "Remove Department",
              "View Department Budget",
              "EXIT"              
          ]
        })
        .then((answer) => {
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
              default:
                  console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });


// view all departments
function viewDepartments() {
   // Query database
  db.query('SELECT * FROM department', function (err, results) {
  // Display query results using console.table
  console.log("All Departments");
  console.table(results);
  });  
  search(); 
};

// view all roles
function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
  console.log("All Roles");    
  console.table(results);
  });       
  search();    
};

// view all employees
function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.log("All Employees");
    console.table(results);
  });
  search();   
};

// add a department
function addDepartment() {
  inquirer
  .prompt([{
      name: "title",
      type: "input",
      message: "What is the name of new Department?",
  }, 
])
  .then((answers) => {
      // Query database
      db.query(`INSERT INTO department (name) VALUES ("${answers.title}")`, (err, data) => {
              if (err) throw err;
              console.log("New department added!");
              search();
          }
      );
  });
};

// add a role
function addRole() {
  // Query database
  db.query("SELECT id, name FROM department", (err, res) => {
    if (err) throw err;
    const dept = res.map((department) => {
        return {
            name: department.name,
            value: department.id,
        };
    });
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
        .then((answers) => {
            // Query database
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${answers.department})`,
                (err, data) => {
                    if (err) throw err;
                    console.log("Employee role added!");
                    search();
                }
            );
        });
});   
 
};

// add an employee
function addEmployee() {
  db.query("SELECT id, title FROM role", (err, res) => {
    if (err) throw err;
    const role = res.map((role) => {
        return {
            name: role.title,
            value: role.id,
        };
    });
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
        .then((answers) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role}, ${answers.manager})`,
                (err, data) => {
                    if (err) throw err;
                    console.log("Employee added!");
                    search();
                }
            );
        });
});
};

// update an employee role
function updateEmployeeRole() {
    // Query database
    db.query("select*,a.id as empID, concat(first_name, \" \", last_name) as concatName from employee a left join role b on a.role_id = b.id", (err, res) => {
    if (err) throw err;
    // map method
    const employeeUpdate = res.map((employeeUpdate) => {
        return {
            name: employeeUpdate.concatName,
            value: employeeUpdate.empID,
        };
    });
    const roleUpdate = res.map((roleUpdate) => {
        return {
            name: roleUpdate.title,
            value: roleUpdate.id,
        };
    });
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
            db.query(`UPDATE employee SET role_id = ${answers.newRole} where employee.id = ${answers.employee}`, (err, data) => {
                    if (err) throw err;
                    console.log("Employee's new role updated!");
                    search();
                }
            );
        });
});
};

// View employees by department
function viewEmployeesByDepartment() {
    const sql = `SELECT employee.first_name AS firstName, 
                        employee.last_name AS lastName, 
                        department.name AS Department
                 FROM employee 
                 LEFT JOIN role ON employee.role_id = role.id 
                 LEFT JOIN department ON role.department_id = department.id`;
  
    db.query(sql, (err, rows) => {
      if (err) throw err; 
      console.log("Employees by Department");
      console.table(rows); 
      search();
    });          
};

// Delete Department
function removeDepartment() {
  db.query("SELECT id, name FROM department", (err, res) => {
    if (err) throw err;
    const dept = res.map((department) => {
        return {
            name: department.name,
            value: department.id,
        };
    });
    inquirer
        .prompt([{
            type: "list",
            name: "removeDepartment",
            choices: dept,
            message: "Which department would you like to remove?",
        }, 
    ])
        .then((answers) => {
          db.query(`DELETE FROM department WHERE id = ${answers.removeDepartment}`, (err, data) => {
                    if (err) throw err;
                    console.log("Department Removed!");
                    search();
                }
            );
        });
}); 
}
};

// view department budget
function viewDepartmentBudget(){
    const sql = `SELECT department_id AS Id, 
                        department.name AS Department,
                        SUM(salary) AS Budget
                 FROM  role  
                 JOIN department ON role.department_id = department.id GROUP BY  department_id`;
    
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.log("Department Budget"); 
      console.table(rows);
  
      search(); 
    });     
};

search();