const mongoose = require('mongoose');
const { Schema } = mongoose;
const PolicyTypeSchema = new Schema({
    policy_type_name: { type: String },
    policy_type_location: { type: Array },
    policy_type_status: { type: Number, default: 1 },
    policy_type_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('policy_type', PolicyTypeSchema);