const mongoose = require('mongoose');
const { Schema } = mongoose;
const Line_of_businessSchema = new Schema({
    line_of_business_name: { type: String },
    line_of_business_location:{ type: Array},
    line_of_business_status: { type: Number, default: 1 },
    line_of_business_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Line_of_business', Line_of_businessSchema)