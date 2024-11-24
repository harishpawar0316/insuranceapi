const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocationsSchema = new Schema({
    location_name: { type: String },
    ref_number: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'countries' },
    technical_person: { type: Array },
    account_or_admin: { type: Array },
    supervisor_or_manager: { type:Array },
    lob: { type:Array },
    location_status: { type: Number, default: 1 },
},
{ timestamps: true }
);
module.exports = mongoose.model('Locations', LocationsSchema)