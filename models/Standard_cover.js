const mongoose = require('mongoose');
const { Schema } = mongoose;
const Standard_coverSchema = new Schema({
    standard_cover_label:{type : String},
    standard_cover_lob:{type : Array},
    plan_category_id:{type: Array},
    standard_cover_description:{type : String},
    standard_cover_company:{type : Array},
    standard_cover_plan:{type : Array},
    standard_cover_status:{type : Number , default : 1},
    location:{type:Array},
    travel_insurance_for:{type:Array},
    home_plan_type:{type:Array},
    medical_plan_type:{type:Array},
    cover_type:{type:Array},
    standard_cover_timestamp: { type : Date, default : Date.now}
    
});

module.exports= mongoose.model('standard_cover',Standard_coverSchema)