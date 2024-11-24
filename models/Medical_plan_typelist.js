const mongoose = require('mongoose');
const { Schema } = mongoose;
const Medical_plan_type_listSchema = new Schema({
    medical_plan_type:{type : String},
    medical_plan_type_location:{type : Array},
    medical_plan_type_status:{type : Number},
    medical_plan_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('medical_plan_type_list',Medical_plan_type_listSchema)