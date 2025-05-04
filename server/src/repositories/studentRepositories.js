const Student = require("../models/Student");

class StudentRepository {
  async create(data) {
    const student = new Student(data);
    return student.save();
  }

  async findAll(searchQuery) {
    return Student.find({
      $or: [
        { student_name: { $regex: searchQuery, $options: "i" } },
        { student_id: { $regex: searchQuery, $options: "i" } },
        { phoneNumber: { $regex: searchQuery, $options: "i" } },
        { serial_number: { $regex: searchQuery, $options: "i" } },
      ],
    });
  }

  async findById(id) {
    return Student.findOne({ _id: id });
  }

  async search(searchTerm) {
    return Student.find({
      $or: [
        { student_name: { $regex: searchTerm, $options: "i" } },
        { student_id: { $regex: searchTerm, $options: "i" } },
        { phoneNumber: { $regex: searchTerm, $options: "i" } },
        { serial_number: { $regex: searchTerm, $options: "i" } },
      ],
    });
  }

  async update(id, data) {
    console.log("Updating student with ID:", id, "with data:", data);
    return Student.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async delete(id) {
    return Student.findOneAndDelete({ _id: id });
  }

  async getBySerialNumber(serial_number) {
    return Student.findOne({ serial_number: serial_number });
  }
}

module.exports = new StudentRepository();
