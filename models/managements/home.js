const mongoose = require('mongoose');
const {Schema} = mongoose;
const home_permission_schema = new Schema({
    property_type:{type:Array},
    home_plan_type:{type:Array},
    home_ownership_type:{type:Array},
    home_condition:{type:Array},
    home_plan:{type:Array},
    additional_home_condition:{type:Array},
    user_type_id:{
        type:Schema.Types.ObjectId, ref: 'Admins'
    }
})

module.exports.Home_permission = mongoose.model("Home_permission",home_permission_schema)