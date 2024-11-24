const mongoose = require('mongoose');
const { Schema } = mongoose;

const Travel_plan_priceSchema = new Schema({
    plan_id: { type: Schema.Types.ObjectId, ref: 'travel_plans' },
    price_name: { type: String },
    plan_type_id: { type: Schema.Types.ObjectId, ref: 'travel_plan_types' },
    region_id: { type: Array },
    cover_type_id: { type: Schema.Types.ObjectId, ref: 'travel_cover_type_lists' },
    no_of_days_or_topup: { type: Array },
    age_or_topup: { type: Array },
    no_of_child: { type: Array },
    no_of_spouse: { type: Array},
    no_of_days_strings:{type:String},
    status: { type:Boolean, default: true },
},
    { timestamps: true }
);

module.exports = mongoose.model('travel_plan_prices', Travel_plan_priceSchema);