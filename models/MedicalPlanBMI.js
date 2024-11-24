const mongoose = require('mongoose');
const { Schema } = mongoose;
const medicla_plan_bmiSchema = new Schema({
    medical_plan_id: { type: Schema.Types.ObjectId, ref: 'medical_plans' },
    weight_type: { type: Schema.Types.ObjectId, ref: 'medical_weight_type_lists' },
    BMIArray: { type: Array },
    status: { type: Number, default: 1 }
},
    { timestamps: true }
);
module.exports = mongoose.model('medical_plan_bmi', medicla_plan_bmiSchema);