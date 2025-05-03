const PC = require("../models/PC");

class PCRepository {
  async create(data) {
    const pc = new PC(data);
    return pc.save();
  }

  async findByOwnerId(owner_id) {
    return PC.findOne({ owner_id });
  }

  async updateByOwnerId(owner_id, data) {
    return PC.findOneAndUpdate({ owner_id }, data, { new: true });
  }

  async deleteByOwnerId(owner_id) {
    return PC.findOneAndDelete({ owner_id });
  }

  async findBySerialNumber(serial_number) {
    return PC.findOne({ serial_number });
  }
}

module.exports = new PCRepository();
