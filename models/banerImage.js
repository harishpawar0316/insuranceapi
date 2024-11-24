const mongoose = require("mongoose");
const { Schema } = mongoose;
const banerImageSchema = new Schema(
  {
    image: { type: Array },
    alt: {
      type: String,
    },
    lob: { type: Schema.Types.ObjectId, ref: "line_of_businesses" },
    status: { type: Boolean, default: true },
    company_name: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("banerImage", banerImageSchema);