const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanCategorySchema = new Schema({
    plan_category_name : { type: String },
    plan_category_location: { type: Array },
    plan_category_status : { type: Number, default: 1 },
    plan_category_timestamp : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan_category', PlanCategorySchema);