const mongoose = require('mongoose');
const { Schema } = mongoose;
const Make_motor_modelSchema = new Schema({
    motor_model_name: { type: String },
    motor_model_make_id: { type : Schema.Types.ObjectId, ref: 'Make_motor' },
    motor_model_location: { type: Array },
    motor_model_status: { type: Number, default: 1 },
    motor_model_timestamp: { type: Date, default: Date.now },
    qicMakeCode:{type: String},
    qicModelCode:{type: String},
    aoutoDataMedelCode:{type: String},
    jdvDataMedelCode:{type: Number}


});
module.exports = mongoose.model('Motor_model', Make_motor_modelSchema)