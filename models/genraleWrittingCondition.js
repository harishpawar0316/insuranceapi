const mongoose = require('mongoose');
const { Schema } = mongoose;

const generalWrittingConditionSchema = new Schema({
    condition: { type: String, required: true },
    location: { type: Array},
    status:{type : Number, default:1},
    
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('generalWrittingCondition', generalWrittingConditionSchema);