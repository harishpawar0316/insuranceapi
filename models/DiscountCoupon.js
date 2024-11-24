const moongose = require('mongoose');
const Schema = moongose.Schema;

const couponCodeSchema = new Schema({
    lob : { type: Array },
    location : { type: Array },
    agent : { type: Array },
    code : { type: String },
    discount : { type: String },
    description : { type: String },
    startdate : { type: Date},
    enddate: { type: Date },
    status : { type: Boolean , default: true},
},
{
    timestamps:true
}
);

module.exports = moongose.model('couponCode', couponCodeSchema);