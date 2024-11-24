const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReasonSchema = new Schema({
    reason_type: { type: String },
    status: { type: Number, default: 1 },
    location: { type: Array },
    reason_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Reason', ReasonSchema);