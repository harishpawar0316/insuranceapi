const mongoose = require('mongoose');
const { Schema } = mongoose;

const yacht_conditionSchema = new Schema({
    yacht_condition_label: { type: String, required: true },
    yacht_condition_location: { type: Array },  
    yacht_condition_status:{type : Number, default: 1},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('yacht_condition', yacht_conditionSchema);