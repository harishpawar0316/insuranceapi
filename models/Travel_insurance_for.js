const mongoose = require('mongoose');
const { Schema } = mongoose;
const Travel_insuranceSchema = new Schema({
    travel_insurance_for:{type : String},
    travel_insurance_location:{type : Array},
    travel_insurance_for_status:{type : Number,default:1},
    travel_insurance_for_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('travel_insurance_for',Travel_insuranceSchema)