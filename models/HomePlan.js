const mongoose = require('mongoose')
const { Schema } = mongoose;
const HomePlanSchema = new Schema({
    plan_name: { type: String },
    line_of_business_id:{ type : Schema.Types.ObjectId, ref: 'line_of_businesses' ,default:"641bf0a2cbfce023c8c76724"},
    company_id: { type: Schema.Types.ObjectId, ref: 'companies' },
    plan_category_id : { type : Schema.Types.ObjectId, ref: 'plan_categories' },
    nature_of_plan_id : { type : Schema.Types.ObjectId, ref: 'nature_of_plans' },
    property_type_id : { type: Array },
    ownership_status_id : { type: Schema.Types.ObjectId, ref: 'home_ownership_status_lists' },
    plan_type_id : { type: Schema.Types.ObjectId, ref: 'home_plan_type_lists' },
    // initial_rate : { type: String },
    // discount_rate : {  type:String},
    // rate : { type: String },
    excess: { type: String},
    content_value_or_topup: {type: Array},
    pbvalue_or_topup : {type:Array},
    building_value_or_topup : {type:Array},
    claimyears_or_topup : { type: Array },
    domestic_helper_or_topup : {type:Array},
    add_op_con_desc_or_topup : {type:Array},
    jdv_comm : { type: String},
    policywordings_file : {type: [String], default: []},
    standard_cover_arr: { type: Array},
    additional_cover_arr: { type: Array},
    condition_arr: { type: Array},
    location: { type: Array},
    status: { type: Number, default: 1 },
    plan_created_by: { type: mongoose.Types.ObjectId }
});

module.exports = mongoose.model('Home_plan', HomePlanSchema)
