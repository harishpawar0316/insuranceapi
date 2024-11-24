const mongoose = require('mongoose');
const { Schema } = mongoose;
const Home_property_type_listSchema = new Schema({
    home_property_type:{type : String},
    home_property_type_location:{type : Array},
    home_property_type_status:{type : Number,default:1},
    home_property_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('home_property_type_list',Home_property_type_listSchema)