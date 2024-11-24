const mongoose = require('mongoose');
const { Schema } = mongoose;
const Yacht_speedKnots_type_listSchema = new Schema({
    yacht_speed_knot_type:{type : String},
    yacht_speed_knot_type_location:{type : Array},
    yacht_speed_knot_type_status:{type : Number,default : 1},
    yacht_speed_knot_type_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('yacht_speed_knot_type_list',Yacht_speedKnots_type_listSchema)