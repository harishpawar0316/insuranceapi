const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdditionalUnderConditions = new Schema({
    feature: { type: String, required: true },
    description: { type: String, required: true },
    status:{type : Number, default: 1},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('additioinal_underwriting_conditions', AdditionalUnderConditions);