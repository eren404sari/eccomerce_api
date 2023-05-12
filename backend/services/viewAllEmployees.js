function viewAllEmployees(employees, mainMenu) {
  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    console.log("\nAll Employees:");
    employees.forEach((employee) => {
      console.log(
        `ID: ${employee.getId()}, Full Name: ${employee.getFullName()}, Age: ${employee.getAge()}, Contact: ${employee.getContact()}, Email: ${employee.getEmail()}`
      );
    });
  }
  mainMenu();
}

module.exports = viewAllEmployees;
