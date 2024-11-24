const mongoose = require('mongoose');
const { Schema } = mongoose;
const producerDiscountSchema = new Schema({
    description: {type : String},
    rate: {type : String},
    location: {type : Schema.Types.ObjectId, ref: 'location'},
    lob: { type: Array },
    discount_type: { type: String },
    effective_date:{ type:Date},    
    status: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('producerDiscount',producerDiscountSchema)