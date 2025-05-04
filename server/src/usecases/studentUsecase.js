const studentRepository = require("../repositories/studentRepositories");
const pcRepository = require("../repositories/pcRepositories");
const { generateQrCode } = require("../utils/generateQrCode");
const { sendQrCodeEmail } = require("../utils/sendQrCodeEmail");

class StudentUsecase {
  async register(data) {
    const qrCodeBase64 = await generateQrCode(data.serial_number);

    const student = await studentRepository.create({
      student_id: data.student_id,
      student_name: data.student_name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      serial_number: data.serial_number,
      pc_brand: data.pc_brand,
      pc_color: data.pc_color,
      status: data.status || "in",
      qr_code: qrCodeBase64,
    });

    const pc = await pcRepository.create({
      serial_number: data.serial_number,
      pc_brand: data.pc_brand,
      pc_color: data.pc_color,
      owner_id: student._id,
    });

    await sendQrCodeEmail(data.email, qrCodeBase64);

    return { student, pc };
  }

  async search(searchTerm) {
    let students = await studentRepository.search(searchTerm);

    const pcs = await PC.find({
      $or: [
        { pc_brand: { $regex: searchTerm, $options: "i" } },
        { pc_color: { $regex: searchTerm, $options: "i" } },
      ],
    });

    const pcOwnerIds = pcs.map((pc) => pc.owner_id);
    const pcStudents = await Student.find({ _id: { $in: pcOwnerIds } });

    const studentMap = new Map();
    students.concat(pcStudents).forEach((student) => {
      studentMap.set(student._id.toString(), student);
    });

    return Array.from(studentMap.values());
  }

  async getAll(searchQuery) {
    const students = await studentRepository.findAll(searchQuery);
    if (!students || students.length === 0) return [];
    const response = await Promise.all(
      students.map(async (student) => {
        const pc = await pcRepository.findByOwnerId(student._id);
        return {
          id: student._id,
          student_id: student.student_id,
          student_name: student.student_name,
          phoneNumber: student.phoneNumber,
          email: student.email,
          status: student.status,
          serial_number: student.serial_number,
          pc_brand: pc.pc_brand,
          pc_color: pc.pc_color,
          pc: pc
            ? {
                serial_number: pc.serial_number,
                pc_brand: pc.pc_brand,
                pc_color: pc.pc_color,
              }
            : null,
        };
      })
    );
    return response;
  }

  async getById(student_id) {
    const student = await studentRepository.findById(student_id);
    if (!student) throw new Error("Student not found");
    const pc = await pcRepository.findByOwnerId(student._id);
    return { student, pc };
  }

  async update(id, data) {
    const student = await studentRepository.findById(id);
    if (!student) throw new Error("Student not found");

    const updateData = {
      student_name: data.student_name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      status: data.status,
    };

    await studentRepository.update(id, updateData);

    if (data.serial_number || data.pc_brand || data.pc_color) {
      const pcUpdateData = {
        serial_number: data.serial_number || student.serial_number,
        pc_brand: data.pc_brand || student.pc_brand,
        pc_color: data.pc_color || student.pc_color,
      };
      await pcRepository.updateByOwnerId(student._id, pcUpdateData);
    }

    const updatedStudent = await studentRepository.findById(id);
    const pc = await pcRepository.findByOwnerId(student._id);
    return { student: updatedStudent, pc };
  }

  async delete(student_id) {
    const student = await studentRepository.findById(student_id);
    if (!student) throw new Error("Student not found");

    await pcRepository.deleteByOwnerId(student._id);
    await studentRepository.delete(student._id);
  }

  async getBySerialNumber(serial_number) {
    const student = await studentRepository.findBySerialNumber(serial_number);
    if (!student) throw new Error("Student not found");
    const pc = await pcRepository.findByOwnerId(student._id);
    return { student, pc };
  }
}

module.exports = new StudentUsecase();
