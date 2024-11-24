const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const customersSchema = new Schema(
  {
    full_name: { type: String },
    mobile_number: { type: Number },
    email: { type: String },
    date_of_brith: {
      type: Date,
    },
    nationality: { type: String },
    decription: { type: String },
    password: { type: String },
    status: { type: Number, default: 1 },
    chatstatus: { type: Boolean, default: false },
    ipaddress: { type: String },
    location: { type: String },
    usertype: { type: String, trim: true, default: "client" },
    IpAddress: { type: String },
    UserAgent: { type: String },
    deviceDetails: { type: Object },
  },
  {
    timestamps: true,
  }
);
customersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
module.exports.Customer = mongoose.model("Customer", customersSchema);