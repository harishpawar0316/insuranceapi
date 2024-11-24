const mongoose = require('mongoose');
const { Schema } = mongoose;
const Home_plan_type_listSchema = new Schema({
    home_plan_type:{type : String},
    home_plan_type_location:{type : Array},
    home_plan_type_status:{type : Number,default:1},
    home_plan_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('home_plan_type_list',Home_plan_type_listSchema)