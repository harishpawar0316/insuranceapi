const mongoose = require("mongoose");
const ChatsRoomsForAllAdminsModelsScheema = mongoose.Schema({
  Chats: [
    {
      // chat user
      customer: {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        trim: true,
      },
      customerbyip: {
        type: Number,
        ref: "CustomerByIp",
        trim: true,
      },
    },
  ],
});

const ChatsRoomsForAllAdminsModels = mongoose.model(
  "ChatsRoomsForAllAdminsModels",
  ChatsRoomsForAllAdminsModelsScheema
);
// (async () => {
//   const count = await ChatsRoomsForAllAdminsModels.countDocuments();
//   if (count === 0) {
//     // Create a default document
//     await ChatsRoomsForAllAdminsModels.create({});
//   }
// })();
// module.exports = ChatsRoomsForAllAdminsModels;
