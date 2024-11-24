const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const claimSchema = new Schema({
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
remark:{type:String},
  policy_claim_status: { type: String, enum: ["In Progress", "Partially Done","Completed"],default:"Pending"},
  status: { type: Number, default: 1 },
  updated_by: { type: Schema.Types.ObjectId, ref:'admins'}
},{
  timestamps:true,
}
);

module.exports.Claims = mongoose.model("Claim", claimSchema);