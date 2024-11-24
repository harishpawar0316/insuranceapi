const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const businessEntityLinkschema = new Schema({
    status : { type: Boolean, default: true },
    link : { type: String, },
    name : { type: String, },
    email : { type: String, },
    number : { type: String, },
    businessEntityId : { type: Schema.Types.ObjectId, ref: 'admins', },
    newLeadId : { type: Schema.Types.ObjectId, ref: 'new_leads', }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('businessEntityLink', businessEntityLinkschema)