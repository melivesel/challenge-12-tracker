const fs = require('fs');
const path = require('path'); // Include the path module
const { Pool } = require('pg');
const inquirer = require('inquirer');

const pool = new Pool({
  user: 'postgres',
  password: 'launchpad',
  host: 'localhost',
  database: 'departments_db'
});

pool.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database.')
        // Prompt the user with Inquirer
        inquirer.prompt([
          {
            type: 'list',
            name: 'start-q',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Employees', 'View all Roles', 'Add Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
          }
        ]).then((answers) => {
          switch (answers['start-q']) {
            case 'View all Departments':
              const sqlDepartments = `SELECT id, department_name AS department FROM departments`;
              pool.query(sqlDepartments, (err, resultDepartments) => {
                if (err) {
                  console.error('Error fetching departments:', err);
                  return;
                }
                const departments = resultDepartments.rows;
                console.log('All Departments:');
                departments.forEach((department) => {
                  console.log(`ID: ${department.id}, Name: ${department.department}`);
                });
              });
              break;
              case 'View all Employees':
                const sqlEmployees = `
                    SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role_title, roles.salary AS role_salary, employee.manager_id
                    FROM employee
                    LEFT JOIN roles ON employee.role_id = roles.id
                `;
                pool.query(sqlEmployees, (err, resultEmployees) => {
                    if (err) {
                        console.error('Error fetching employees:', err);
                        return;
                    }
                    const employees = resultEmployees.rows;
                    console.log('All Employees:');
                    employees.forEach((employee) => {
                        console.log(`ID: ${employee.id}, Name: ${employee.first_name} ${employee.last_name}, Role: ${employee.role_title}, Salary: ${employee.role_salary}, Manager: ${employee.manager_id}`);
                    });
                });
                break;
              break;
              case 'View all Roles':
                const sqlRoles = ` SELECT roles.id, roles.title, roles.salary, departments.department_name AS department_name
FROM roles
LEFT JOIN departments ON roles.department_id = departments.id`
                pool.query(sqlRoles, (err, resultRoles) => {
                  if (err) {
                    console.error('Error fetching roles:', err);
                    return;
                  }
                  const roles = resultRoles.rows;
                  console.log('All Roles:');
                  roles.forEach((role) => {
                    console.log(`ID: ${role.id}, Role: ${role.title}, Salary: ${role.salary} Department: ${role.department_name}` );
                  });
                });
                break;
            case 'Add Department':
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'departmentName',
                  message: 'Enter Department Name:'
                },
              ]).then((answers) => {
                const departmentName = answers.departmentName;
                const sqlAddDepartment = 'INSERT INTO departments (department_name) VALUES ($1)';
                const valuesAddDepartment = [departmentName];
                pool.query(sqlAddDepartment, valuesAddDepartment)
                  .then(() => {
                    console.log(`Department "${departmentName}" added successfully!`);
                  })
                  .catch((err) => {
                    console.error('Error adding department:', err);
                  });
              });
              break;
            case 'Add a Role':
              // Implement logic to add a role
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'roleName',
                  message: 'Enter Role Title:'
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'Enter role salary:'
                },
                {
                  type: 'input',
                  name: 'departmentId',
                  message: 'Enter Department ID:'
                },
                
              ]).then((answers) => {
                const roleName = answers.roleName;
                const salaryValue = answers.salary;
                const departmentIdValue = answers.departmentId;
                const sqlAddRole = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
                const valuesAddRole = [roleName, salaryValue, departmentIdValue];
                pool.query(sqlAddRole, valuesAddRole)
                  .then(() => {
                    console.log(`Role "${roleName}" added successfully!`);
                  })
                  .catch((err) => {
                    console.error('Error adding role:', err);
                  });
              });
              break;
            case 'Add an Employee':
              // Implement logic to add an employee
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: 'Enter Employee First Name:'
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: 'Enter Employee Last Name:'
                }, 
                {
                  type: 'input',
                  name: 'role',
                  message: 'Enter Employee Role ID:'
                },
                {
                  type: 'input',
                  name: 'manager',
                  message: 'Enter Employee Manager ID:'
                },
              ]).then((answers) => {
                const firstName = answers.firstName;
                const lastName = answers.lastName;
                const role = answers.role;
                const manager = answers.manager;
                const sqlAddEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
                const valuesAddEmployee = [firstName, lastName, role, manager];
                pool.query(sqlAddEmployee, valuesAddEmployee)
                  .then(() => {
                    console.log(`Employee"${firstName}" "${lastName}" added successfully!`);
                  })
                  .catch((err) => {
                    console.error('Error adding Employee:', err);
                  });
              });
              break;
            case 'Update an Employee Role':
              // Implement logic to update an employee role
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'empId',
                  message: 'Enter Employee id:'
                },
                {
                  type: 'input',
                  name: 'roleId',
                  message: 'Enter Role id:'
                },
              ]).then((answers) => {
                const empId = answers.empId;
                const roleId = answers.roleId;
                const sqlUpdateRole = 'UPDATE employee SET role_id = $1 WHERE id = $2'
                const valuesUpdateRole = [roleId, empId];
                pool.query(sqlUpdateRole, valuesUpdateRole)
                  .then(() => {
                    console.log(`Role updated successfully for employee with ID ${empId}!!`);
                  })
                  .catch((err) => {
                    console.error('Error updating role:', err);
                  });
              });
              break;
            default:
              console.log('Invalid choice');
          }
        });
      })
    .catch((err) => {
    console.error('Error connecting to the database:', err);
  });