const mongoose = require('mongoose');
const { Schema } = mongoose;
const Travel_plan_typeSchema = new Schema({
    travel_plan_type:{type : String},
    travel_plan_type_location:{type : Array},
    travel_plan_type_status:{type : Number, default: 1},
    travel_plan_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('travel_plan_type',Travel_plan_typeSchema)