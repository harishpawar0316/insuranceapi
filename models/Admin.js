const mongoose = require("mongoose");
const { Schema } = mongoose;
const AdminSchema = new Schema(
  {
    usertype: { type: Schema.Types.ObjectId, ref: "usertypes", default: "65eeb6c21d866055f9331460" },
    subusertype:{type:Array},
    name: { type: String },
    email: { type: String, },
    mobile: { type: String },
    date_of_brith: { type: Date },
    line_of_business: { type: Array },
    location: { type: Array },
    password: { type: String },
    status: { type: Number, default: 1 },
    admin_business_type: { type: Array },
    profile_image: { type: Array },
    assignSalesAdvisor: { type: Array },
    assignPolicyIssuer: { type: Array },  
    assignDacumentChaser: { type: Array },
    motor_permission: { type: Array },
    travel_permission: { type: Array },
    home_permission: { type: Array },
    yacht_permission: { type: Array },
    medical_permission: { type: Array },
    master_permission: { type: Array },
    dashboard_permission: { type: Array },
    group_medical_permission: { type: Array },
    description: { type: String },
    hrId: { type: Schema.Types.ObjectId, ref: "admins" },
    groupMedicalPlanId: { type: Array },
    insurance_company: { type: Schema.Types.ObjectId, ref: 'companies' },
    employeeNumber: { type: String },
    agentApprovalStatus: { type: Boolean, default: true },
    tempStaffId: { type: String, default: null },
    loginOtp: { type: String, default: null },
  },
  { timestamps: true }
);

const ChatsRoomsForAdminsModels = require("./Chats/ChatsRoomsForAdmins");
AdminSchema.pre("save", async function (next) {
  console.log(this._id);
  if (this.isNew) {
    try {
      const chatRoom = await ChatsRoomsForAdminsModels.create({
        AdminId: this._id,
        usertype: this._usertype,
        Chats: [],
      });
      await chatRoom.save();
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    next();
  }
});
module.exports = mongoose.model("Admins", AdminSchema);
