const mongoose = require('mongoose');
const { Schema } = mongoose;
const Medical_plan_condition_listSchema = new Schema({
    medical_plan_condition:{type : String},
    medical_plan_condition_location:{type : Array},
    medical_plan_condition_status:{type : Number},
    medical_plan_condition_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('medical_plan_condition_list',Medical_plan_condition_listSchema)