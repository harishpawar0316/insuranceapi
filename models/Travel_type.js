const mongoose = require('mongoose');
const { Schema } = mongoose;
const Travel_typeSchema = new Schema({
    travel_type:{type : String},
    travel_type_location:{type : Array},
    travel_type_status:{type : Number, default:1},
    travel_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('travel_type',Travel_typeSchema)