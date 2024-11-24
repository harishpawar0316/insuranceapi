const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LeadstatusSchema = new Schema({
    lead_status : { type: String},
    lead_status_timestamp : { type: Date, default: Date.now }
});
module.exports = mongoose.model('Lead_status', LeadstatusSchema);