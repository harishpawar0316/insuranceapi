const mongoose = require('mongoose');
const { Schema } = mongoose;
const usefulLinksSchema = new Schema({
    hospital_name: { type: String },
    website: { type: String },
    direction: { type: String },
    address: { type: String },
    call: { type: String },
    location: { type: Array },
    file: { type: String },
    status: { type: Boolean, default: 1 }
},{
    timestamps: true
});
module.exports = mongoose.model('useful_links', usefulLinksSchema);