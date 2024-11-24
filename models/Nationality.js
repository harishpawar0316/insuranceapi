const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NationalitySchema = new Schema({
    nationality_name : { type: String },
    nationality_location: { type: Array },
    nationality_status : { type: Number, default: 1 },
    nationality_timestamp : { type: Date, default: Date.now }
});
module.exports = mongoose.model('Nationality', NationalitySchema);