const mongoose = require('mongoose');
const { Schema } = mongoose;
const ActualSalaryBandSchema = new Schema({
    actual_salary_band: { type: String },
    actual_salary_band_location: { type: Array },
    visa_country: { type: Array },
    actual_salary_band_status: { type: Number, default: 1 },
    actual_salary_band_timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('actual_salary_band', ActualSalaryBandSchema)