const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DaysSchema = new Schema({
    name: { type: String },
    start_time: { type: String },
    end_time: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 },
},
{
    timestamps: true
});
module.exports = mongoose.model('Preferred_days', DaysSchema);