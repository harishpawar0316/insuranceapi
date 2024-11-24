const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cancelPolicySchema = new Schema({
  full_name: { type: String },
  email: { type: String },
  comments: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: 'customers'},
  policy_number:{
    type:Number
  },
  documents:{
    type:Array,
  },
  new_lead_id:{
    type:Schema.Types.ObjectId, ref: 'new_leads'
  },
  status : { type : Boolean, default : true},
},{
  timestamps:true,
}
);
module.exports = mongoose.model("Cancel_policy", cancelPolicySchema);