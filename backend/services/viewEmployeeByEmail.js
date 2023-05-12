function viewEmployeeByEmail(employees, rl, mainMenu) {
  rl.question("Enter employee email: ", (email) => {
    const employee = employees.find(
      (emp) => emp.getEmail().toLowerCase() === email.toLowerCase()
    );
    if (employee) {
      console.log(
        `ID: ${employee.getId()}, Full Name: ${employee.getFullName()}, Age: ${employee.getAge()}, Contact: ${employee.getContact()}, Email: ${employee.getEmail()}`
      );
    } else {
      console.log("Employee not found.");
    }
    mainMenu();
  });
}

module.exports = viewEmployeeByEmail;
