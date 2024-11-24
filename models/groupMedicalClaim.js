const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupMedicalClaimSchema = new Schema({
  princepleId: { type: Schema.Types.ObjectId,ref :"group_medical_leads"},
  memberId: { type: Schema.Types.ObjectId ,ref :"group_medical_leads"},
  relation: { type: String },
  employeeId: { type: String },
  claimAmountFromHr: { type: Number ,default :0},
  paidAmount: { type: Number,default :0 },

  claimDscription: { type: String },
  dateOfTreatment: { type: Date },
  doccuments: { type: Array },
  groupMedicalLeadId:{
    type:Schema.Types.ObjectId, ref: 'group_medical_leads'
  },
  claimStatus: { type: String, enum: ["Pending", "Partially Setteled", "Fully Setteled","Under Process","Declined"],default:"Pending"},
  memberRequestId:{
    type:Schema.Types.ObjectId, ref: 'member_requests'
  },
  HRID:{
    type:Schema.Types.ObjectId, ref: 'admins'
  },
  status: { type: Number, default: 1 },
  remark: { type: String },
  settledDate:{type:Date},
  claimNymber: { type: String },
  planId:{type:Schema.Types.ObjectId, ref: 'group_medical_plans'}
},{
  timestamps:true,
}
);

module.exports = mongoose.model("groupMedicalClaim", groupMedicalClaimSchema);