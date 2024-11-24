const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NatureOfPlanSchema = new Schema({
    nature_of_plan_name : { type: String },
    nature_of_plan_location: { type: Array },
    nature_of_plan_status : { type: Number, default: 1 },
    nature_of_plan_timestamp : { type: Date, default: Date.now }
});
module.exports = mongoose.model('Nature_of_plan', NatureOfPlanSchema);