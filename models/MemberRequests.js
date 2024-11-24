const mongoose = require('mongoose');
const { Schema } = mongoose;
const MemberRequestSchema = new Schema({
    plan_id: { type: Schema.Types.ObjectId, ref: 'group_medical_plans' },
    user_id: { type: Schema.Types.ObjectId, ref: 'admins' },
    company_id: { type: Schema.Types.ObjectId, ref: 'companies' },
    tpa: { type: Schema.Types.ObjectId, ref: 'tpa' },
    network: { type: Schema.Types.ObjectId, ref: 'networks' },
    file: { type: String },
    claimRequest: { type: Boolean,default: false },
    status: { type: Number, default: 1 },
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('member_requests', MemberRequestSchema)