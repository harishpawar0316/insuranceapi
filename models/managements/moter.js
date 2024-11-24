const mongoose = require('mongoose');
const {Schema} = mongoose;
const motor_ermission_schema = new Schema({
    make_motor:{type:Array},
    model_motor:{type:Array},
    motor_model_details:{type:Array},
    body_type:{type:Array},
    area_of_registration:{type:Array},
    repair_type:{type:Array},
    business_type:{type:Array},
    motor_plan:{type:Array},
    motor_claim_years:{type:Array},
    user_type_id:{
        type:Schema.Types.ObjectId, ref: 'Admins'
    }
})

module.exports.Motor_permission = mongoose.model("Motor_permission",motor_ermission_schema)