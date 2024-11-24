const mongoose = require('mongoose');
const { Schema } = mongoose;

const group_medicla_plan_rates = new Schema({
    group_medical_plan_id: { type: Schema.Types.ObjectId, ref: 'Group_Medical_plans' },
    policy_name: { type: String },
    planCatagoryId: { type: String },
    network: { type: mongoose.Types.ObjectId , ref: 'networks' },
    TPA: { type: mongoose.Types.ObjectId , ref: 'tpas' },
    locationArray: { type: Array },
    status: { type: Number, default: 1 }
},

    { timestamps: true }
);

module.exports = mongoose.model('group_medicla_plan_rates', group_medicla_plan_rates);