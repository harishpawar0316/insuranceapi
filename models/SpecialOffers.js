const mongoose = require('mongoose');
const { Schema } = mongoose;
const SpecialOfferSchema = new Schema({
    policy_type: { type: Schema.Types.ObjectId , ref:'policy_types' },
    userId:{type:Array},
    discount_amount: { type: String },
    discount_code:{type:String},
    status:{type:Boolean,default:true},
    startDate: { type: Date},
    endDate: { type: Date},
    description:{type:String}
},{ timestamps: true });
module.exports = mongoose.model('Special_offer', SpecialOfferSchema);