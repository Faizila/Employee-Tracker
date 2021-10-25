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
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  );

-- delete table with this name if exist
DROP TABLE IF EXISTS employee;
-- Create table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) 
  REFERENCES role(id),
  FOREIGN KEY (manager_id) 
  REFERENCES employee(id)
  ON DELETE SET NULL
);

