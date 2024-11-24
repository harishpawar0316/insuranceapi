const mongoose = require('mongoose');
const { Schema } = mongoose;
const yachtMakeSchema = new Schema({
    name: { type: String },
    location: { type: Array },
    status: { type: Boolean, default: true },
    logo:{type:String},
},
{
    timestamps:true
}
);
module.exports = mongoose.model('yachtMake', yachtMakeSchema)