const mongoose = require('mongoose');
const {Schema} = mongoose;
const Yacht_permission_schema = new Schema({
    year_code : {type:Array},
    yacht_make:{type:Array},
    yacht_model:{type:Array},
    yacht_engine:{type:Array},
    yacht_body_type:{type:Array},
    hull_material:{type:Array},
    horse_power_list:{type:Array},
    engine_list:{type:Array},
    speed_knots_list:{type:Array},
    yacht_condition:{type:Array},
    yacht_experience:{type:Array},
    yacht_questionnaire:{type:Array},
    yacht_plan:{type:Array},
    boat_breadth:{type:Array},
    user_type_id:{
        type:Schema.Types.ObjectId, ref: 'Admins'
    }
})

module.exports.Yacht_permission = mongoose.model("Yacht_permission",Yacht_permission_schema)