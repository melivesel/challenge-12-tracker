INSERT INTO departments (department_name)
VALUES ('General Merchandise'),
('Service'),
('Market'),
('Loss Prevention'),
('Leadership');
INSERT INTO roles (title, salary, department_id)
VALUES ('Stocker', 30000 , 1),
('Cashier', 25000, 2),
('Specialist', 40000, 4), 
('Cutter', 50000, 3 ),
('Manager', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'McAlister', 5, NULL), 
('Mickey', 'Rooney', 2, 1) ;