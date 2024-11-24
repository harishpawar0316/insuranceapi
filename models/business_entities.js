const mongoose = require('mongoose');
const { Schema } = mongoose;
const businessEntitiesSchema = new Schema({
    business_entity_name:{
        type:String,
    },
    ref_number:{
        type:String
    },
    location:{
        type:Array,
    },
    country:{
        type:Schema.Types.ObjectId, ref: 'countries',
    },
    technical_person:{
        type:Array,
    },
    account_or_admin:{
        type:Array,
    },
    supervisor_or_manager:{
        type:Array,
    },
    lob:{
        type:Array,
    },
    business_entity_status:{
        type:Boolean,default:true,
    },
},
{ timestamps: true }
);
module.exports = mongoose.model('business_entities', businessEntitiesSchema)