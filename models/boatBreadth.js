const mongoose = require('mongoose');
const { Schema } = mongoose;
const medical_boat_breadth_Schema = new Schema({
    name: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 },
},
{
    timestamps:true
}
);
module.exports = mongoose.model('boat_breadth', medical_boat_breadth_Schema)