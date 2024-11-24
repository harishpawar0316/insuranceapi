const mongoose = require('mongoose');
const { Schema } = mongoose;
const MedicalDeclartionSchema = new Schema({
    name:{type : String},
    location:{type : Array},
    status:{type : Boolean,default : true},
},
{
    timestamps:true,
}
);

module.exports= mongoose.model('medical_declaration',MedicalDeclartionSchema)