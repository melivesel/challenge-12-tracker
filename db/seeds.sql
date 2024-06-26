INSERT INTO departments (id, department_name)
VALUES (1,'General Merchandise'),
(2,'Service'),
(3,'Market'),
(4,'Loss Prevention'),
(5, 'Leadership');
INSERT INTO roles (id, title, salary, department_id)
VALUES (1,'Stocker', 30000 , 1),
(2,'Cashier', 25000, 2),
(3,'Specialist', 40000, 4), 
(4,'Cutter', 50000, 3 ),
(5,'Manager', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'McAlister', 5, NULL), 
('Mickey', 'Rooney', 2, 5);