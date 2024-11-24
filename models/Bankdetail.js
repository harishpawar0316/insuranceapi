const mongoose = require('mongoose');
const { Schema } = mongoose;
const BankSchema = new Schema({
    companyid: {type : String},
    bankname: {type : String},
    accountnumber: {type : String},
    ibannumber: {type : String},
    swiftcode: {type : String},
    line_of_business_id: { type: Schema.Types.ObjectId, ref: 'line_of_businesses' },
    bankstatus: {type: Number, default: 1},
    createdAt: { type : Date, default : Date.now}

});
module.exports= mongoose.model('Bankdetail',BankSchema)