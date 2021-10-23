USE employees_db;

INSERT INTO department (name)
VALUES 
('Information Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 95000, 1),
('Accountant', 78000, 2),
('Paralegal', 60000, 3),
('Manager', 75000, 4),
('Engineer', 95000, 5),
('Sales Rep', 62000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, 1),
('Ronald', 'Wilson', 2, 2),
('David', 'Miller', 3, 3),
('Mary', 'Hall', 4, 4),
('Linda', 'Young', 5, 5),
('Nick', 'Morrison', 6, 6);