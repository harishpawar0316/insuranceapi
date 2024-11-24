const mongoose = require('mongoose');
const { Schema } = mongoose;
const Travel_cover_type_listSchema = new Schema({
    travel_cover_type:{type : String},
    travel_cover_type_location:{type : Array},
    travel_cover_type_status:{type : Number,default:1},
    travel_cover_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('travel_cover_type_list',Travel_cover_type_listSchema)