const mongoose = require('mongoose');
const { Schema } = mongoose;
const TravelPlanSchema = new Schema({
    line_of_business_id: { type: Schema.Types.ObjectId, ref: 'line_of_businesses' },
    company_id: { type: Schema.Types.ObjectId, ref: 'companies' },
    plan_name: { type: String },
    travel_insurance_for_id : { type : Schema.Types.ObjectId, ref: 'travel_insurance_fors' },
    travel_type_id : { type : Schema.Types.ObjectId, ref: 'travel_types' },
    plan_category_id : { type : Schema.Types.ObjectId, ref: 'travel_cover_type_lists' },//here plan_category_id is cover type
    nature_of_plan_id : { type : Schema.Types.ObjectId, ref: 'nature_of_plans' },
    country_or_topup : { type: Array },
    add_op_con_desc : { type: Array },
    jdv_comm : { type: String },
    sale_person_comm : { type: String },
    policywordings_file : {  type: [String], default: []},
    travel_plans : { type: Array },
    standard_cover_arr: { type: Array},
    additional_cover_arr: { type: Array},
    location: { type: Array },
    status: { type: Number, default: 1 },
    plan_created_by:{type:mongoose.Types.ObjectId}
});
module.exports = mongoose.model('Travel_plan', TravelPlanSchema)