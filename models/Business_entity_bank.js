const mongoose = require('mongoose');
const { Schema } = mongoose;
const BankSchema = new Schema({
    businessentityid: {type : String},
    bankname: {type : String},
    accountnumber: {type : String},
    ibannumber: {type : String},
    line_of_business_id: { type: Schema.Types.ObjectId, ref: 'line_of_businesses' },
    bankstatus: {type: Number, default: 1},
},
{ 
    timestamps: true
}
);
module.exports= mongoose.model('business_entity_bank',BankSchema)