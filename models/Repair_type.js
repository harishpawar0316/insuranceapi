const mongoose = require('mongoose');
const { Schema } = mongoose;
const RepairTypeSchema = new Schema({
    repair_type_name: { type: String },
    repair_type_location: { type: Array },
    repair_type_status: { type: Number, default: 1 },
    repair_type_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('repair_type', RepairTypeSchema);