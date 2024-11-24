const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const amRatingchema = new Schema({
    status : { type: Boolean, default: true },
    ratingCategory : { type: String },
    ratingSymbol : { type: String },
    ratingDefinition : { type: String}
},
{
    timestamps:true
}
);

module.exports = mongoose.model('amrating', amRatingchema)