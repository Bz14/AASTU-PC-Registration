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

  async findById(student_id) {
    return Student.findOne({ student_id });
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

  async update(student_id, data) {
    return Student.findOneAndUpdate({ student_id }, data, { new: true });
  }

  async delete(student_id) {
    return Student.findOneAndDelete({ student_id });
  }
}

module.exports = new StudentRepository();
