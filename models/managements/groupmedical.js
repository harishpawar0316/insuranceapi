const mongoose = require('mongoose');
const {Schema} = mongoose;
const groupmedical_permission_schema = new Schema({
    group_medical_plan:{type:Array},
    claim_request:{type:Array},
    category:{type:Array},
    claim_type:{type:Array},
    claim_status:{type:Array},
    claim_descriptions:{type:Array},
    claim_procedure:{type:Array},
    useful_links:{type:Array},
    tat_days:{type:Array},
    marital_status:{type:Array},
    gender:{type:Array},
    relation:{type:Array},
    sponsor_type:{type:Array},
    work_location:{type:Array},

    user_type_id:{
        type:Schema.Types.ObjectId, ref: 'Admins'
    }
})

module.exports.Group_Medical_permission = mongoose.model("Group_medical_permissions",groupmedical_permission_schema)