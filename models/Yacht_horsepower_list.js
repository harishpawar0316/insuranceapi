const mongoose = require('mongoose');
const { Schema } = mongoose;
const Yacht_horsepower_type_listSchema = new Schema({
    yacht_horsepower_type:{type : String},
    yacht_horsepower_type_location:{type : Array},
    yacht_horsepower_type_status:{type : Number,default : 1},
    yacht_horsepower_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('yacht_horsepower_type_list',Yacht_horsepower_type_listSchema)