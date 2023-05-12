//class in this module for reusable data structure.
class Employee {
  constructor(id, fullName, age, contact, email) {
    this.id = id;
    this.fullName = fullName;
    this.age = age;
    this.contact = contact;
    this.email = email;
  }

  getId() {
    return `${this.id}`;
  }
  getFullName() {
    return `${this.fullName}`;
  }
  getAge() {
    return `${this.age}`;
  }
  getContact() {
    return `${this.contact}`;
  }
  getEmail() {
    return `${this.email}`;
  }
}

module.exports = Employee;
