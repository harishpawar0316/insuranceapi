const mongoose = require('mongoose');
const { Schema } = mongoose;
const lmpPartnerSchema = new Schema({
    companyId: {type: String},
    logo:{type:Object},
    lob:{ type:Array },
    status: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('our_partner',lmpPartnerSchema)