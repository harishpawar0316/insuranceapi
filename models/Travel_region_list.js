const mongoose = require('mongoose');
const { Schema } = mongoose;
const Travel_region_listSchema = new Schema({
    travel_region:{type : String},
    travel_region_location:{type : Array},
    travel_region_country:{type : Array},
    travel_region_status:{type : Number , default : 1},
    travel_region_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('travel_region_list',Travel_region_listSchema)