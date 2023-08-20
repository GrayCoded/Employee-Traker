const inquirer = require('inquirer');

const connection = require('../config/connection')


// async function displayEmployees() {

//     const [allEmployees, employeesFields] = await connection.promise().query(`
//     SELECT 
//         Employees.id AS employee_id,
//         emp.First_Name,
//         emp.Last_Name,
//         Roles.Title AS job_title,
//         Departments.Department AS department,
//         rl.Salary,
//         CONCAT(mgr.First_Name, ' ', mgr.Last_Name) AS manager
//     FROM Employees emp
//     JOIN Roles rl ON emp.Role_id = rl.id
//     JOIN Departments dep ON rl.Department_id = dep.id
//     JOIN Employees mgr ON emp.Manager_id = mgr.id;
// `);
//     console.table(allEmployees);
// }
async function displayEmployees() {

    const [allEmployees, employeesFields] = await connection.promise().query
        (`SELECT * FROM Employees`);
    console.table(allEmployees);
}

async function displayRoles() {
    const [roles, rolesFields] = await connection.promise().query('SELECT * FROM Roles');
    console.table(roles);
}

async function displayDepartments() {
    const [departments, departmentsFields] = await connection.promise().query('SELECT * FROM Departments');
    console.table(departments);
}

async function addedEmployee() {
    const [roles, rolefields] = await connection.promise().query('SELECT * FROM Roles');
    const roleChoices = roles.map(role => ({
        name: role.Title,
        value: role.id
    }));

    const employees = await connection.promise().query('SELECT * FROM Employees');
    const employeeChoices = employees.map(employee => ({
        name: `${employee.First_Name} ${employee.Last_Name}`,
        value: employee.id
    }));

    employeeChoices.push('NO MANAGER');
    employeeChoices.unshift({ name: 'NO MANAGER', value: null });

    await inquirer
        .prompt([
            {
                type: 'input',
                message: "Employee's first name?",
                validate: lengthValidator,
                name: 'firstName'
            },
            {
                type: 'input',
                message: "Employee's last name?",
                validate: lengthValidator,
                name: 'lastName'
            },
            {
                type: 'list',
                message: "Employee's manager?",
                choices: employeeChoices,
                name: 'empManager'
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: roleChoices,
                name: 'role'
            }
        ])
        .then(async data => {
            const managerId = data.empManager === 'NO MANAGER' ? null : data.empManager;

            await connection.promise().query(
                'INSERT INTO Employees (First_Name, Last_Name, Role_id, Manager_id) values (?, ?, ?, ?)',
                [data.firstName, data.lastName, data.role, managerId]
            );
            console.info(data.First_Name, 'Added!');
        })
        .catch(err => {
            console.error("error:", err);
        });
}


async function addedRole() {
    const departments = await connection.promise().query('SELECT * FROM Departments');
    const departmentChoices = departments.map(department => ({
        name: department.department,
        value: department.id
    }));
    await inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the role?",
                validate: roleLengthValidator,
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary for said role?',
                validate: salaryValidator,
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What is the department this role is in?',
                choices: departmentChoices,
                name: 'department'
            }
        ])
        .then(async data => {
            await connection.promise().query(
                `INSERT INTO roles (title, salary, department_id) values ('${data.roleName}','${data.salary}', ${data.department})`
            )
            console.info(data.roleName, 'role added')
        })
        .catch(err => {
            console.error("error:", err)
        })
}

async function updatedRole() {
    const employees = await connection.promise().query('SELECT * FROM Employees',)
    const employeeChoices = employees.map(employee => ({
        name: `${employee.First_Name} ${employee.Last_Name}`,
        value: employee.id
    }))
    await inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select the employee you want to update the role of:',
                choices: employeeChoices,
                name: 'employeeId'
            }
        ])
        .then(async data => {
            const roles = await connection.promise().query('SELECT * FROM roles');
            const roleChoices = roles.map(role => ({
                name: role.Title,
                value: role.id
            }))

            await inquirer
                .prompt(
                    {
                        type: 'list',
                        message: 'What is the role you want updated for the selected Employee?',
                        choices: roleChoices,
                        name: 'roleId'
                    }
                )
                .then(async roleData => {
                    await connection.promise().query(
                        'UPDATE Employees SET Role_id = ? WHERE id = ?',
                        [roleData.roleId, data.employeeId]
                    )
                    console.log('Role updated')
                })
                .catch(err => {
                    console.error("error:", err)
                })
        })
        .catch(err => {
            console.error("error:", err)
        })
}


async function addedDepartment() {
    await inquirer
        .prompt(
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                validate: depLengthValidator,
                name: 'addDepartment'
            }
        )
        .then(async department => {
            await connection.promise().query(
                `INSERT INTO departments (department) VALUE ('${department.addedDepartment}')`
            )
            console.info(department.addedDepartment, 'department added.')
        })
        .catch(err => {
            console.error("error:", err)
        })
}
async function calculatedBudget() {
    const budget = await connection.promise().query(

        `SELECT dep.Department AS department, SUM(rl.Salary) AS utilized_budget
        FROM Employees emp
        LEFT JOIN Roles rl ON emp.Role_id = rl.id
        LEFT JOIN Departments dep ON rl.Department_id = dep.id
        GROUP BY dep.Department;`
    )

    return budget
}

async function displayBudget() {
    const [budgetData, budgetFields] = await calculatedBudget()
    console.table(budgetData)
}



const lengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Enter valid name.';
    } else {
        return true;
    }
}

const roleLengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Enter valid role name.';
    } else {
        return true;
    }
}

const depLengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Enter in a valid Department.';
    } else {
        return true;
    }
}

const salaryValidator = async (input) => {
    if (isNaN(input)) {
        return 'Enter valid salary.';
    } else {
        return true;
    }
}

module.exports = {
    displayEmployees, displayRoles, displayDepartments, addedEmployee,
    updatedRole, addedDepartment, addedRole, displayBudget
}