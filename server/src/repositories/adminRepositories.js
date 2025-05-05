const Admin = require("../models/admin");

class AdminRepository {
  async findAll(searchQuery) {
    return Admin.find({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { phoneNumber: { $regex: searchQuery, $options: "i" } },
      ],
    }).select("-password");
  }

  async findById(admin_id) {
    return Admin.findOne({ admin_id }).select("-password");
  }

  async findByUsername(username) {
    return Admin.findOne({ username }).select("+password");
  }

  async create(data) {
    const admin = new Admin(data);
    return admin.save();
  }

  async update(admin_id, data) {
    return Admin.findOneAndUpdate({ admin_id }, data, { new: true }).select(
      "-password"
    );
  }

  async delete(admin_id) {
    return Admin.findOneAndDelete({ admin_id });
  }

  async getMonthlyCounts() {
    return Admin.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  }

  async search(query) {
    return Admin.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phoneNumber: { $regex: query, $options: "i" } },
      ],
    }).select("-password");
  }
}

module.exports = new AdminRepository();
