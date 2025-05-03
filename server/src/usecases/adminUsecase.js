const adminRepository = require("../repositories/adminRepository");
const bcrypt = require("bcrypt");

class AdminUseCase {
  async login({ username, password }) {
    const admin = await adminRepository.findByUsername(username);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new Error("Invalid credentials");
    }
    if (admin.role !== "super_admin") {
      throw new Error("Access denied. Super admin role required.");
    }
    return admin;
  }

  async getAdmins() {
    return adminRepository.findAll();
  }

  async getAdminById(admin_id) {
    const admin = await adminRepository.findById(admin_id);
    if (!admin) throw new Error("Admin not found");
    return admin;
  }

  async createAdmin(data) {
    data.password = await bcrypt.hash(data.password, 10);
    data.role = data.role || "admin";
    return adminRepository.create(data);
  }

  async updateAdmin(admin_id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const admin = await adminRepository.update(admin_id, data);
    if (!admin) throw new Error("Admin not found");
    return admin;
  }

  async deleteAdmin(admin_id) {
    const admin = await adminRepository.delete(admin_id);
    if (!admin) throw new Error("Admin not found");
    return admin;
  }

  async getChartData() {
    const monthlyCounts = await adminRepository.getMonthlyCounts();
    const counts = Array(12).fill(0);
    monthlyCounts.forEach(({ _id, count }) => {
      counts[_id - 1] = count;
    });
    return {
      barData1: {
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
            label: "Total Admin Registrations",
            data: counts,
            backgroundColor: "#e2ad00e1",
          },
        ],
      },
    };
  }
}

module.exports = new AdminUseCase();
