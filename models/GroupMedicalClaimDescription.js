const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMedicalClaimDescriptionSchema = new Schema({
    claim_description: { type: String },
    claim_type_id: { type: Schema.Types.ObjectId, ref: 'group_medical_claim_type' },
    claim_implication: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 }
},{
    timestamps: true
});
module.exports = mongoose.model('group_medical_claim_description', GroupMedicalClaimDescriptionSchema);