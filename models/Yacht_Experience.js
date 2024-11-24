const mongoose = require('mongoose');
const { Schema } = mongoose;
const Yacht_Experience = new Schema({
    name: { type: String },
    number: { type: Number },
    status: { type: Boolean, default: true},
    location: { type: Array},
},
{
    timestamps: true
}
);

module.exports = mongoose.model('yacht_experience', Yacht_Experience)