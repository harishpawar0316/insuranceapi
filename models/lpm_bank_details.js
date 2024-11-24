const mongoose = require('mongoose');
const { Schema } = mongoose;
const lmpBankDetailsSchema = new Schema({
    companyId: {type : String},
    bankName: {type : String},
    accountNumber: {type : String},
    ibanNumber: {type : String},
    swiftCode: {type : String},
    address: {type : String},
    lob:{ type: Schema.Types.ObjectId, ref: "line_of_businesses" },
    bankstatus: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('lmpBankDetails',lmpBankDetailsSchema)