const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicalSymptomsSchema = new Schema({
    condition: { type: String, required: true },
    status:{type : Boolean, default:true},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('medical_symptoms_condition', medicalSymptomsSchema);