const mongoose = require('mongoose');
const { Schema } = mongoose;
const Make_motorSchema = new Schema({
    make_motor_name: { type: String },
    make_motor_location: { type: Array },
    make_motor_status: { type: Number, default: 1 },
    make_motor_logo:{type:String},
    katarQicCode:{type:String},
    katarAutodataCode:{type:String},
    jdvCode:{type:Number},

    make_motor_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Make_motor', Make_motorSchema)