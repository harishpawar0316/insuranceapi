const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const best_plan = new Schema({
    lob: { type: mongoose.Schema.Types.ObjectId, ref: 'line_of_businesses' },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' },
    repair_type: { type: mongoose.Schema.Types.ObjectId, ref: 'repair_types' },
    nature_of_plan: { type: mongoose.Schema.Types.ObjectId, ref: 'nature_of_plans' },
    policy_type: { type: Array },
    travel_insurance_for: { type: Array },
    home_plan_type: { type: Array },
    medical_plan_type: { type: Array },
    best_plan_price: { type: Number },
    best_plan_topup: { type: Number },
    travel_cover_type: { type: Array },
    location: { type: Array },
    plan_category: { type: Array },
    status: { type: Number, default: 1 },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('best_plan', best_plan)