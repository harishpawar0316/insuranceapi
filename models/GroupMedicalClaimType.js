const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMedicalClaimTypeSchema = new Schema({
    claim_type_name: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 }
}, {
    timestamps: true
});
module.exports = mongoose.model('group_medical_claim_type', GroupMedicalClaimTypeSchema);