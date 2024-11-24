const mongoose = require('mongoose');
const { Schema } = mongoose;

const maternityQuestionnaireSchema = new Schema({
    condition: { type: String, required: true },
    location:{type:Array},
    status:{type : Number, default:true},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('medical_maternity_questionnaire', maternityQuestionnaireSchema);