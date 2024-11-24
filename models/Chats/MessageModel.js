const mongoose = require("mongoose")
const MessageScheema = mongoose.Schema({
  msg: { type: String, trim: true },
  username: { type: String, trim: true },
  usertype: { type: String, trim: true },
  Roomid: {
    type: mongoose.Types.ObjectId,
    trim: true,
    ref: "ChatsRoomsForAdminsModels",
  },
  time: { type: Number },
  read: { type: Boolean, default: false },
  userid: { type: mongoose.Types.ObjectId, trim: true },
});
const MessageModel = mongoose.model("MessageModel", MessageScheema);
module.exports = MessageModel;
