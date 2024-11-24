const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Body_typeSchema = new Schema({
    body_type_name: { type: String },
    body_type_location: { type: Array },
    body_type_status: { type: Number, default: 1 },
    body_type_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Body_type', Body_typeSchema)