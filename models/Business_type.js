const mongoose = require('mongoose');
const { Schema } = mongoose;
const BusinessTypeSchema = new Schema({
    business_type_name: { type: String },
    business_type_location: { type: Array },
    business_type_status: { type: Number, default: 1 },
    business_type_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('business_type', BusinessTypeSchema);