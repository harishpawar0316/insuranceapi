const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeAdditionalConditionSchema = new Schema({
    condition: { type: String, required: true },
    location: { type: Array},
    company:{type:Array},
    planType:{type:Array},
    planCategory:{type:Array},
    status:{type : Number, default: 1},
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('homeAdditionalCondition', homeAdditionalConditionSchema);