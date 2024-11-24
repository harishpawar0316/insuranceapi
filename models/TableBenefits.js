const mongoose = require('mongoose');
const { Schema } = mongoose;

const table_benefits = new Schema({
    table_benefit: { type: String, required: true },
    table_benefit_description: { type: String, required: true },
    table_benefit_status:{type : Number, default: 1}
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('table_benefit', table_benefits);