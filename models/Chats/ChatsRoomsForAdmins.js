const mongoose = require("mongoose");
const ChatsRoomsForAdminsModelsScheema = mongoose.Schema({
  AdminId: { type: mongoose.Types.ObjectId, ref: "Admins", unique: true },
  Chats: [
    {
      // chat user
      customer: {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        trim: true,
      },
      customerbyip: {
        type: mongoose.Types.ObjectId,
        ref: "CustomerByIp",
        trim: true,
      },
      assigned: {
        type: Boolean,
        default: false,
      },
    },
  ],
  token: { type: String },
  isBusy: { type: Boolean, default: false },
});
const ChatsRoomsForAdminsModels = mongoose.model(
  "ChatsRoomsForAdminsModels",
  ChatsRoomsForAdminsModelsScheema
);
module.exports = ChatsRoomsForAdminsModels;
