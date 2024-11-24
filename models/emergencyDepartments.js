const mongoose = require('mongoose');
const { Schema } = mongoose;
const emergencyDepartmentSchema = new Schema({
    Name: {type : String},
    number: {type : String},
    email: {type : String},
    departments: {type : String},
    lob:{ type: Array },
    status: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('emergency_department',emergencyDepartmentSchema)