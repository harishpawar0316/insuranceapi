const mongoose = require('mongoose');
const { Schema } = mongoose;
const Medical_salary_range_listSchema = new Schema({
    medical_salary_range:{type : String},
    medical_salary_range_location:{type : Array},
    visa_country:{type : Array},
    medical_salary_range_status:{type : Number,default:1},
    medical_salary_range_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('medical_salary_range_list',Medical_salary_range_listSchema)