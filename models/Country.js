const moongose = require('mongoose');
const Schema = moongose.Schema;

const CountrySchema = new Schema({
    country_code : { type: String },
    country_name : { type: String },
});

module.exports = moongose.model('countrie', CountrySchema);