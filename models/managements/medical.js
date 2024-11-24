const mongoose = require('mongoose');
const {Schema} = mongoose;
const medical_permission_schema = new Schema({
    plan_type:{type:Array},
    visa_countries:{type:Array},
    visa_type:{type:Array},
    salary_range:{type:Array},
    weight_type:{type:Array},
    medical_plan:{type:Array},
    health_questionnaire:{type:Array},
    additional_conditions:{type:Array},
    co_payments:{type:Array},
    underwriting_conditions:{type:Array},
    maternity_conditions:{type:Array},
    declaration:{type:Array},
    tpa:{type:Array},
    network:{type:Array},
    networklist:{type:Array},
    medical_labels:{type:Array},
    user_type_id:{
        type:Schema.Types.ObjectId, ref: 'Admins'
    }
})

module.exports.Medical_permission = mongoose.model("Medical_permission",medical_permission_schema)