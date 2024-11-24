const mongoose = require('mongoose');
const { Schema } = mongoose;
const Additional_coverSchema = new Schema({
    additional_cover_label:{type : String},
    additional_cover_lob:{type : Array},
    additional_cover_description:{type : String},
    location:{type : Array},
    additional_cover_status:{type : Number,default:1},
    additional_cover_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('additional_cover',Additional_coverSchema)   