const mongoose = require('mongoose');
const {Schema} = mongoose;

const TPBuisnessSchema = new Schema({
        name:{type:String},
        phone:{type:Number},
        email:{type:String},
        briefinfo:{type:String},
        createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model('TPBuisness',TPBuisnessSchema);