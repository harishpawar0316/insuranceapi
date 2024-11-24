const mongoose = require('mongoose');
const { Schema } = mongoose;
const MotorPlanSchema = new Schema({
    line_of_business_id: { type: Schema.Types.ObjectId, ref: 'line_of_businesses' },
    plan_name: { type: String },
    company_id: { type: Schema.Types.ObjectId, ref: 'companies' },
    plan_category_id: { type: Schema.Types.ObjectId, ref: 'plan_categories' },
    nature_of_plan_id: { type: Schema.Types.ObjectId, ref: 'nature_of_plans' },
    medical_plan_type_id: { type: Schema.Types.ObjectId, ref: 'medical_plan_type_lists' },
    medical_visa_country_or_topup: { type: Array },
    plan_condition_or_topup: { type: Array },
    salary_range_or_topup: { type: Array },
    nationality_or_topup: { type: Array },
    add_op_con_desc: { type: Array },
    jdv_comm: { type: String },
    policywordings_file: { type: [String], default: [] },
    standard_conditions_arr: { type: Array },
    additional_conditions_arr: { type: Array },
    underwriting_conditions_arr: { type: Array },
    additional_cover_arr: { type: Array },
    medical_benefits: { type: Array },
    BMI: { type: Array },
    standard_cover_arr: { type: Array },
    location: { type: Array },
    excess: { type: String },
    status: { type: Number, default: 1 },
    maternity_condition_arr: { type: Array },
    general_condition_arr: { type: Array },
    plan_created_by:{type:mongoose.Types.ObjectId}
},{
    timestamps:true,
}
);

module.exports = mongoose.model('Medical_plan', MotorPlanSchema)
