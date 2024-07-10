SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, roles.department_id, employee.manager_id
FROM employee
LEFT JOIN roles ON roles.id = employee.role_id;