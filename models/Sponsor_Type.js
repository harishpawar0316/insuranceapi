const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SponsorTypeSchema = new Schema({
    sponsortype: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 },
},
{
    timestamps: true
});
module.exports = mongoose.model('Sponsor_Type', SponsorTypeSchema);