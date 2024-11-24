const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const otherInsurancSchema = new Schema({
    insurance_name : { type: String },
    status:{type:Boolean}
}
,{
    timestamps:true
});
module.exports = mongoose.model('other_insurance', otherInsurancSchema);