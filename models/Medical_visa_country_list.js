const mongoose = require('mongoose');
const { Schema } = mongoose;
const Medical_visa_country_listSchema = new Schema({
    medical_visa_country:{type : String},
    medical_visa_country_location:{type : Array},
    medical_visa_country_status:{type : Number},
    medical_visa_country_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('medical_visa_countries_list',Medical_visa_country_listSchema)