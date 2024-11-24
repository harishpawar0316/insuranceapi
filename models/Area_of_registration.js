const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AreaOfRegistrationSchema = new Schema({
    area_of_registration_name : { type: String },
    area_of_registration_location: { type: Array },
    area_of_registration_status : { type: Number, default: 1 },
    area_of_registration_timestamp : { type: Date, default: Date.now }
});
module.exports = mongoose.model('Area_of_registration', AreaOfRegistrationSchema);
