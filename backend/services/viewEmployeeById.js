function viewEmployeeById(employees, rl, mainMenu) {
  rl.question("Enter employee ID: ", (id) => {
    const employee = employees.find((emp) => emp.getId() === id);
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
module.exports = viewEmployeeById;
