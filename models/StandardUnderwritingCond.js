const mongoose = require('mongoose');
const { Schema } = mongoose;

const StandardUnderConditions = new Schema({
    feature: { type: String, required: true },
    description: { type: String, required: true },
    location:{type:Array},
    status:{type : Number, default: 1},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('standard_underwriting_conditions', StandardUnderConditions);