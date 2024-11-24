const mongoose = require('mongoose');
const { Schema } = mongoose;
const vat_detailSchema = new Schema({
    vat_percentage: { type: String },
    vat_lob:{type:Array},
    vat_location: { type: Array },
    vat_status: { type: Number, default: 1 },
    vat_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('vat', vat_detailSchema)