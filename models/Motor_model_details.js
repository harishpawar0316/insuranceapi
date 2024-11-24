const mongoose = require('mongoose');
const { Schema } = mongoose;
const Motor_model_detailSchema = new Schema({
    motor_model_detail_name: { type: String },
    motor_model_detail_model_id: { type : Schema.Types.ObjectId, ref: 'motor_models' },
    motor_model_detail_start_year: { type: Number },
    motor_model_detail_body_type: { type : Schema.Types.ObjectId, ref: 'body_types' },
    motor_model_make_id: { type : Schema.Types.ObjectId, ref: 'make_motors' },
    motor_model_detail_cylinder: { type: String },
    motor_model_detail_min: { type: String },
    motor_model_detail_max: { type: String },
    motor_model_detail_dep: { type: Number },
    motor_model_detail_min_dep: { type: String },
    motor_model_detail_max_dep: { type: String },
    motor_model_detail_discontinuation_year: { type: Number },
    motor_model_detail_location: { type: Array },
    motor_model_detail_status: { type: Number, default: 1 },
    motor_model_detail_start_years:{type:Array},
    motor_model_detail_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Motor_model_details', Motor_model_detailSchema)