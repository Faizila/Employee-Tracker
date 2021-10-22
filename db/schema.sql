-- Delete database
DROP DATABASE IF EXISTS employees_db;
-- Create database
CREATE DATABASE employees_db;
-- use database
USE employees_db;

-- delete table with this name if exist
DROP TABLE IF EXISTS department;
-- Create table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

-- delete table with this name if exist
DROP TABLE IF EXISTS role;
-- Create table
CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INT NOT NULL
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- delete table with this name if exist
DROP TABLE IF EXISTS employee;
-- Create table
CREATE TABLE employee (
  emp_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  emp_role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (emp_id),
  FOREIGN KEY (emp_role_id) REFERENCES role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);

