const mongoose = require('mongoose');
const { Schema } = mongoose;
const businessEntityTopup = new Schema({
    desciption: {type : String},
    rate: {type : String},
    location: {type : Array},
    lob: {type : Array},
    company: {type : Array},
    status: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('businessEntityTopup',businessEntityTopup)