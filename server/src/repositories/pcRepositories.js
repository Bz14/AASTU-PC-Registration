// File: repositories/pcRepository.js
const PC = require("../models/pc");

class PCRepository {
  async findAll() {
    return PC.find();
  }

  async findByOwnerId(owner_id) {
    return PC.findOne({ owner_id });
  }

  async findById(pc_id) {
    return PC.findOne({ pc_id });
  }

  async create(data) {
    const pc = new PC(data);
    return pc.save();
  }

  async update(pc_id, data) {
    return PC.findOneAndUpdate({ pc_id }, data, { new: true });
  }

  async delete(pc_id) {
    return PC.findOneAndDelete({ pc_id });
  }

  async getMonthlyCounts() {
    return PC.aggregate([
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

  async updateByOwnerId(owner_id, data) {
    return PC.findOneAndUpdate({ owner_id }, data, { new: true });
  }

  async deleteByOwnerId(owner_id) {
    return PC.findOneAndDelete({ owner_id });
  }
}

module.exports = new PCRepository();
