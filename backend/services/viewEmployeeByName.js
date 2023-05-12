function viewEmployeeByName(employees, rl, mainMenu) {
  rl.question("Enter employee name: ", (name) => {
    const employee = employees.find(
      (emp) => emp.getFullName().toLowerCase() === name.toLowerCase()
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

module.exports = viewEmployeeByName;
