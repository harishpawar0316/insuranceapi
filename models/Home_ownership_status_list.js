const mongoose = require('mongoose');
const { Schema } = mongoose;
const Home_ownership_status_listSchema = new Schema({
    home_owner_type:{type : String},
    home_ownership_location:{type : Array},
    home_ownership_status:{type : Number,default : 1},
    home_ownership_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('home_ownership_status_list',Home_ownership_status_listSchema)