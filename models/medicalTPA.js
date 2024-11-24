const mongoose = require('mongoose');
const { Schema } = mongoose;
const medical_TPA_Schema = new Schema({
    name: { type: String },
    location: { type: Array },
    file: { type: String },
    status: { type: Number, default: 1 },
},
{
    timestamps:true
}
);
module.exports = mongoose.model('medical_TPA', medical_TPA_Schema)