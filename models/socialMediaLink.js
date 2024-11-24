const mongoose = require('mongoose');
const { Schema } = mongoose;
const socialMediaLinkSchema = new Schema({
    socialMediaName: {type : String},
    contants: {type : String},
    status: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('socialMediaLinkS',socialMediaLinkSchema)