const Employee = require("./employee.js");
const fs = require("fs");
const os = require("os");
var logger = require('morgan');

let employees = []
function allEmployee() {
  return employees
}

function saveEmployeeData(employee) {
  const folderPath = `c:\\`;
  const filePath = `${folderPath}/data/employees.json`;
  const jsonBytes = fs.readFileSync(filePath)
  let employees = JSON.parse(jsonBytes);
  employees.push(employee)

  fs.writeFileSync(filePath, JSON.stringify(employees), (error) => {
    if (error) {
      // console.log("Error saving employee data: ", error);

    } else {
      console.log(
        `Employee with ID ${employee.getId()} has been added and saved.`
      );
      console.log(`Employee data has been saved to: ${filePath}`);
    }
  });
}

function isValidName(name) {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
}

function isValidAge(age) {
  const regex = /^(1[89]|[2-9]\d)$/;
  return regex.test(age);
}

function isValidEmail(email) {
  const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.(com)$/;
  return regex.test(email);
}

function addEmployee(employee) {

  const { fullName, age, contact, email } = employee
  //console.log( fullName, age, contact, email ,employee)
  if (!isValidName(fullName) || !isValidAge(age) || !isValidEmail(email)) {

    throw new Error(`Can not save invalid ${fullName} ${age} ${email} `);
  }

  const id = (employees.length + 1);
  const newEmployee = new Employee(id, fullName, age, contact, email);
  employees.push(newEmployee);
  saveEmployeeData(newEmployee);
  return employees
}

module.exports = addEmployee;