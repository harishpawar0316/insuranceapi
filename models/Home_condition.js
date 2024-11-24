const mongoose = require('mongoose');
const { Schema } = mongoose;

const home_conditionSchema = new Schema({
    home_condition_label: { type: String, required: true },
    home_condition_location: { type: Array },
    home_condition_status:{type : Number, default: 1},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Home_condition', home_conditionSchema);