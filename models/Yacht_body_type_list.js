const mongoose = require('mongoose');
const { Schema } = mongoose;
const Yacht_body_type_listSchema = new Schema({
    yacht_body_type:{type : String},
    yacht_body_type_location:{type : Array},
    yacht_body_type_status:{type : Number,default:1},
    yacht_body_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('yatch_body_type_list',Yacht_body_type_listSchema)