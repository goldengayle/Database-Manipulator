require('dotenv').config();
const mysql = require('mysql2')

const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
require ("console.table")
const dbquery = ""



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: process.env.PASSWORD,
    database: 'cmd_db'
  },
  console.log(`Connected to the cmd_db database.`)
);


async function init() {
  await inquirer
    .prompt([{
      type: 'list',
      message: 'What would you like to do?',
      name: 'init_prompt',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }])
    .then((response) => {
        if (response.init_prompt === 'view all departments') {
          db.query("SELECT * FROM department", (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
          })


        } else if (response.init_prompt === 'view all roles') {
          db.query("SELECT * FROM roles", (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);

          })
        } else if (response.init_prompt === 'view all employees') {
          db.query("SELECT * FROM employee", (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);

          })
        } else if (response.init_prompt === 'add a department') {
          inquirer.prompt([{
            type: 'maxlength-input',
            message: 'What is the name of the department you would like to add??',
            name: 'dep_name',
            maxLength: 30
          }]).then((response) => {
              db.query(`INSERT INTO department(name) VALUES("${response.dep_name}")`, (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log("Department has been added");
          })
            
          })




        } else if (response.init_prompt === 'add a role'){
          inquirer.prompt([{
            type: 'maxlength-input',
            message: 'What is the name of the role you would like to add??',
            name: 'role_name',
            maxLength: 30
          },
          {
            type: 'number',
            message: 'What salary is associated with this role?',
            name: 'role_salary'
          },
          {
            type: 'maxlength-input',
            message: 'What department is this new role associated with?',
            name: 'role_department',
            maxLength: 30
          }
        ]).then((response)=>{
            const depid = db.query(`SELECT id FROM department WHERE NAME = "${response.role_department}"`, (err, result)=>{
              console.log(result)
            })
           
            db.query(`INSERT INTO roles(title,salary, department_id) VALUES("${response.role_name}", ${response.role_salary}, ${depid[0].id}`, (err, result) => {
              if(err){
                console.log(err);
              }
              console.log("New role title has been added")
            })
          })
        } else if (response.init_prompt === 'add an employee'){
          //next prompt is an idea for how to call the roles in an array and give it choice in the inquirer question. I need to then relate this to the 
          let roles = db.query("SELECT title from roles")
          inquirer.prompt([{
            type: 'maxlength-input',
            message: 'What is the first name of the employee you would like to add??',
            name: 'emp_fname',
            maxLength: 30
          },
          {
            type: 'maxlength-input',
            message: 'What is the last name of the employee you would like to add?',
            name: 'emp_lname',
            maxLength: 30
          },
        ]).then((response)=>{
           //substituted values for role_id and manager_id. Fix when I can.
            db.query(`INSERT INTO emploee(emp_fname,emp_lname) VALUES("${response.emp_fname}", ${response.emp_lname}, 1, 1`, (err, result) => {
              if(err){
                console.log(err);
              }
              console.log("New employee has been added")
            })
          })

          }
        })}
      //})*/
    






init();





