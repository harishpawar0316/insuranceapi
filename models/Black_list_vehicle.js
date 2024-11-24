const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Black_list_vehicleSchema = new Schema({
    companyid: { type: Schema.Types.ObjectId, ref:'companies' },
    make_motor_id: { type:Schema.Types.ObjectId, ref:'make_motors'},
    model_motor_id: { type:Schema.Types.ObjectId, ref:'motor_models'},
    motor_model_detail_id: { type: Schema.Types.ObjectId, ref:'motor_model_details'},
    bodyTypeId: { type: Schema.Types.ObjectId, ref:'body_types'},
    status:{type:Boolean, default:true},
    createdAt: { type : Date, default : Date.now}
});

module.exports = Black_list_vehicle = mongoose.model('Black_list_vehicle', Black_list_vehicleSchema);
