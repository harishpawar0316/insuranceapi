const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customersSchema = new Schema(
  {
    full_name: { type: Number, unique: true },
    mobile_number: { type: String },
    email: { type: String, unique: true },
    chatstatus: { type: Boolean, default: false },
    location: { type: String },
    usertype: { type: String, trim: true, default: "ws_login" },
    IpAddress: { type: String },
    UserAgent: { type: String },
    Browser: { type: String },
    Os: { type: String },
    deviceDetails: { type: Object },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("CustomerByIp", customersSchema);
