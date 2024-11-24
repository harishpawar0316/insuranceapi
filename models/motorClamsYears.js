const mongoose = require('mongoose');
const { Schema } = mongoose;

const motorCliamsYearsSchema = new Schema({
    questions: { type: String, required: true },
    status:{type : Boolean, default:true},
    year: { type: Number, required: true },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('motorCliamsYears', motorCliamsYearsSchema);