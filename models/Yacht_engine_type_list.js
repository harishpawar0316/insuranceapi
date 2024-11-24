const mongoose = require('mongoose');
const { Schema } = mongoose;
const Yacht_engine_type_listSchema = new Schema({
    yacht_engine_type:{type : String},
    yacht_engine_type_location:{type : Array},
    yacht_engine_type_status:{type : Number,default : 1},
    yacht_engine_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('yacht_engine_type_list',Yacht_engine_type_listSchema)