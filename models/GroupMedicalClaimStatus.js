const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMedicalClaimStatusSchema = new Schema({
    status_name: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 }
}, {
    timestamps: true
});
module.exports = mongoose.model('group_medical_claim_status', GroupMedicalClaimStatusSchema);