const mongoose = require('mongoose');
const { Schema } = mongoose;
const Medical_weight_type_listSchema = new Schema({
    medical_weight_type:{type : String},
    medical_weight_type_location:{type : Array},
    medical_weight_type_status:{type : Number},
    medical_weight_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('medical_weight_type_list',Medical_weight_type_listSchema)