const pcRepository = require("../repositories/pcRepositories");
const Student = require("../models/Student");

class PCUsecase {
  async getPCs() {
    const pcs = await pcRepository.findAll();
    return pcs;
  }

  async getPCById(pc_id) {
    const pc = await pcRepository.findById(pc_id);
    if (!pc) throw new Error("PC not found");
    return pc;
  }

  async createPC(data) {
    if (data.owner_id) {
      const student = await Student.findOne({ student_id: data.owner_id });
      if (!student) throw new Error("Student not found");
    }
    const pc = await pcRepository.create(data);
    return pc;
  }

  async updatePC(pc_id, data) {
    if (data.owner_id) {
      const student = await Student.findOne({ student_id: data.owner_id });
      if (!student) throw new Error("Student not found");
    }
    const pc = await pcRepository.update(pc_id, data);
    if (!pc) throw new Error("PC not found");
    return pc;
  }

  async deletePC(pc_id) {
    const pc = await pcRepository.delete(pc_id);
    if (!pc) throw new Error("PC not found");
    return pc;
  }

  async getChartData() {
    const monthlyCounts = await pcRepository.getMonthlyCounts();
    const counts = Array(12).fill(0);
    monthlyCounts.forEach(({ _id, count }) => {
      counts[_id - 1] = count;
    });
    return {
      barData2: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total PC Registrations of the Year",
            data: counts,
            backgroundColor: "#22C55E",
          },
        ],
      },
    };
  }
}

module.exports = new PCUsecase();
