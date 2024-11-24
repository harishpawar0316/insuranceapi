const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const spRatingchema = new Schema({
    status : { type: Boolean, default: true },
    ratingSymbol : { type: String, },
    ratingDefinition : { type: String, }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('sprating', spRatingchema)