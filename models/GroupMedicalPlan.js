const mongoose = require('mongoose');
const { Schema } = mongoose;
const GroupMedicalPlanSchema = new Schema({
    line_of_business_id: { type: Schema.Types.ObjectId, ref: 'line_of_businesses' },
    plan_name: { type: String },
    company_id: { type: Schema.Types.ObjectId, ref: 'companies' },
    // tpa: { type: Schema.Types.ObjectId, ref: 'tpa' },
    // network: { type: Schema.Types.ObjectId, ref: 'networks' },
    // network_list: { type: Array },
    from_date: { type: Date },
    to_date: { type: Date },
    location: { type: Array },
    documents:{type:Array},
    status: { type: Number, default: 1 },
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('Group_Medical_plan', GroupMedicalPlanSchema)
