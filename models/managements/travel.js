const mongoose = require("mongoose");
const { Schema } = mongoose;
const travel_permission_schema = new Schema({
  travel_insurance_for: { type: Array },
  travel_type: { type: Array },
  travel_plan_type: { type: Array },
  travel_region_list: { type: Array },
  travel_cover_type: { type: Array },
  travel_plan: { type: Array },
  user_type_id:{
    type:Schema.Types.ObjectId, ref: 'Admins'
}
});

module.exports.Travel_permission = mongoose.model(
  "Travel_permission",
  travel_permission_schema
);
