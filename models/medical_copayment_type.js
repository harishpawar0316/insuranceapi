const mongoose = require('mongoose');
const { Schema } = mongoose;
const medicalCopaymentTypeSchema = new Schema({
    name:{type : String},
    medicalCopaymentId:{type : mongoose.Types.ObjectId},
    planCategory:{type: Array},
    company:{type : Array},
    medicalPlanType:{type : Array},
    status:{type : Number , default : 1},
    location:{type:Array}, 
},
{
timestamps:true,
},
);

module.exports= mongoose.model('medicalCopaymentType',medicalCopaymentTypeSchema)