const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupMedicalLeadSchema = new Schema(
  {
    SINumber: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastnName: { type: String },
    employeeNumber: { type: String },
    email: { type: String },
    phoneno: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    relation: { type: String },
    category: { type: String },
    regino: { type: String },
    LSB: { type: String },
    nationality: { type: String },
    passportNumber: { type: String },
    EidNumber: { type: String },
    UidNumber: { type: String },
    visaIssuedLocation: { type: String },
    actualSalryBand: { type: String },
    personCommission: { type: String },
    residentialLocation: { type: String },
    workLocation: { type: String },
    photoFileName: { type: String },
    sponsorType: { type: String },
    sponsorId: { type: String },
    sponsorContactNumber: { type: String },
    sponsorContactEmail: { type: String },
    occupation: { type: String },
    AdditionEffectiveDate: { type: Date },
    visaFileNumber: { type: String },
    birthCertificateNumber: { type: String },
    HRUserId: { type: Schema.Types.ObjectId, ref: "admins" },
    leadType: { type: String, default: "New" },
    leadStatus: {
      type: String,
      enum: [
        "In Progress",
        "Pending For Approval",
        "Sent To Insurer",
        "Approved",
        "Rejected",
        "Delete"
      ],
      default: "In Progress",
    },
    userleadStatus: {
      type: String,
      enum: [
        "newlyAdded",
        "newMemverApproval",
        "newJdv",
        "deleteMemverApproval",
        "deleteJdv"
      ],
      default: "newlyAdded",
    },
    requestType: {
      type: String,
      enum: [
        "Newly Added",
        "DeLete Request"
      ],
      default: "Newly Added",
    },
    memberRequestId:{ type: Schema.Types.ObjectId, ref: "member_requests" },
    type_of_policy: { type: Schema.Types.ObjectId, ref: "line_of_businesses" },
    planCompanyId: { type: Schema.Types.ObjectId, ref: "companies" },
    planId: { type: Schema.Types.ObjectId },
    TPAId: { type: Schema.Types.ObjectId, ref: "medical_tpas" },
    networkListId: { type: Schema.Types.ObjectId, ref: "medical_network_lists" },
    serialNumber: { type: Number },
    leadIsActive: { type: Boolean, default: true },
  approvedDate:{type:Date},
  sentToMembarDate:{type:Date},
  sentToJdvDate:{type:Date},
  deleteDate:{type:Date},
  documents:{type:Array},
  policyName:{type:String},
  policy_number:{type:String}
  },
  {
    timestamps: true,
    strict: false
  }
);
module.exports = mongoose.model("group_medical_lead", groupMedicalLeadSchema);
