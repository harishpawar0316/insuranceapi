const mongoose = require('mongoose');
const { Schema } = mongoose;

const UnderwitingConditions = new Schema({
    condition: { type: String, required: true },
    location:{type:Array},
    status:{type : Number, default: 1},
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('underwriting_conditions', UnderwitingConditions);