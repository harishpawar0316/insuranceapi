const mongoose = require('mongoose');
const Schema = mongoose.Schema
const MaritalStatusSchema = new Schema({
    name: { type: String },
    location:{type:Array},
    status:{type:Number,default:1}
}, {
    timestamps:true
}
)
module.exports = mongoose.model('Marital_Status',MaritalStatusSchema)