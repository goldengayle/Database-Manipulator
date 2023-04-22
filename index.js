require('dotenv').config();
const mysql = require('mysql2')

const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
require ("console.table")
const dbquery = ""
const roless= []
const departments=[ "math", "science"]



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

function findroles() {
  db.query(`SELECT title FROM roles`, (err, result) =>{
    
    for (var i = 0; i < result.length; i++) {
     roless.push(result[i].title)
    }
    
  })
}

function finddepartments() {
  db.query(`SELECT NAME FROM department`, (err, result) =>{
    for (var i = 0; i < result.length; i++) {
      departments.push(result[i].NAME)
     }
     
  })
}

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
            again(),
          })


        } else if (response.init_prompt === 'view all roles') {
          db.query("SELECT * FROM roles", (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            again(),

          })
        } else if (response.init_prompt === 'view all employees') {
          db.query("SELECT * FROM employee", (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            again(),

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
                again()
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
            
            type: 'list',
            message: 'What department is this new role associated with?',
            name: 'role_department',
            choices: departments
          }
        ]).then((response)=>{
             db.query(`SELECT id FROM department WHERE NAME = "${response.role_department}"`, (err, result)=>{
              db.query(`INSERT INTO roles(title,salary, department_id) VALUES("${response.role_name}", ${response.role_salary}, ${result[0].id})`, (err, result) => {
              if(err){
                console.log(err);
              }
              console.log("New role title has been added")
              again(),
            })})
           
            
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
          {
            type: 'list' ,
            message: 'What role does this person have?',
            name: 'emp_role',
            choices: roless
          }
        ]).then((response)=>{
           //substituted values for role_id and manager_id. Fix when I can.
           db.query(`SELECT id FROM roles WHERE title = "${response.emp_role}"`, (err, result)=>{
            db.query(`INSERT INTO employee(first_name,last_name, role_id) VALUES("${response.emp_fname}", "${response.emp_lname}", ${result[0].id})`, (err, result) => {
              if(err){
                console.log(err);
              }
              console.log("New employee has been added")
              again(),
            })
          })

          })
        } else if (response.init_prompt === 'update an employee role'){
          
        }
      
    })}
      //})*/
    



function again(){
  inquirer.prompt([{
    type: 'list' ,
    message: 'Would you like to complete another task?',
    name: 'taskagain',
    choices: ['yes', 'no']
  }])
  .then((response)=>{
    if(response.taskagain === 'yes'){
      init();
    } if (response.taskagain ==='no'){
      console.log('Have a nice day!');
      return
    }
  })
}


findroles();
finddepartments();      
init();





