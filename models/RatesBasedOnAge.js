const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicla_plan_rates = new Schema({
    medical_plan_id: { type: Schema.Types.ObjectId, ref: 'medical_plans' },
    name:{ type: String },
    planCatagoryId:{ type: mongoose.Types.ObjectId,  },
    network:{ type: mongoose.Types.ObjectId },
    emirateId: { type: Array },
    perioddays: { type: Array },
    // coPayments:{ type: String },
    TPA:{ type: mongoose.Types.ObjectId },
    ageRange:{type: Array },
    primiumArray:{ type: Array },
    locationArray:{ type: Array },
    status:{type:Number,default:1}
},

    { timestamps: true }
);

module.exports = mongoose.model('rates_based_on_age', medicla_plan_rates);