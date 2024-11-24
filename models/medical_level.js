const mongoose = require('mongoose');
const { Schema } = mongoose;
const medical_medical_level_Schema = new Schema({
    name: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 },
},
{
    timestamps:true
}
);
module.exports = mongoose.model('medical_level', medical_medical_level_Schema)