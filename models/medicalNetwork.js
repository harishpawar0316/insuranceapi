const mongoose = require('mongoose');
const { Schema } = mongoose;
const medical_network_Schema = new Schema({
    name: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 },
    TPAID:{type:mongoose.Types.ObjectId},
    planCategory: { type: Array}
},
{
    timestamps:true
}
);
module.exports = mongoose.model('medical_network', medical_network_Schema)