const mongoose = require('mongoose');
const { Schema } = mongoose;
const businessEntityComissionSchema = new Schema({
    desciption: {type : String},
    rate: {type : String},
    location_rate: {type : Array},
    lob: {type : Array},
    status: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('businessEntityComission',businessEntityComissionSchema)