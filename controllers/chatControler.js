const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const MessageModel = require("../models/Chats/MessageModel");
const { Customer } = require("../models/Customer");
const adminModel = require("../models/Chats/ChatsRoomsForAdmins");

// const AddRoomid = async (userid, roomid) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Check if the AdminId and roomid combination already exists in Chats
//       const matchRoomid = await adminModel.aggregate([
//         {
//           $match: {
//             AdminId: ObjectId(userid),
//             Chats: { $elemMatch: { customer: ObjectId(roomid) } },
//           },
//         },
//       ]);

//       if (matchRoomid.length > 0) {
//         // AdminId and roomid combination already exists, update isBusy
//         data = await adminModel
//           .findOneAndUpdate(
//             {
//               AdminId: ObjectId(userid),
//             },
//             {
//               $set: { isBusy: true },
//             },
//             {
//               new: true,
//             }
//           )
//           .populate({
//             path: "Chats.customer",
//             select: ["full_name", "chatstatus"],
//           });
//       } else {
//         // AdminId and roomid combination does not exist, add to Chats
//         data = await adminModel
//           .findOneAndUpdate(
//             {
//               AdminId: ObjectId(userid),
//             },
//             {
//               $push: { Chats: { customer: ObjectId(roomid) } },
//               $set: { isBusy: true },
//             },
//             {
//               new: true,
//             }
//           )
//           .populate({
//             path: "Chats.customer",
//             select: ["full_name", "chatstatus"],
//           });
//       }
//       if (data) {
//         resolve(data);
//       } else {
//         reject(null);
//       }
//     } catch (error) {
//       reject(null);
//     }
//   });
// };

module.exports = {
  CreateFirebaseToken: async (req, res) => {
    try {
      let { Userid } = req.query;
      if (Userid && req.body.token) {
        Userid = Userid.trim();
        let data = await adminModel.findOneAndUpdate(
          { AdminId: Userid },
          {
            $set: { token: req.body.token },
          },
          { new: true }
        );
        if (data) {
          return res.status(200).json({ data, message: "Update Successfully" });
        } else {
          return res.status(404).json({ data, message: "Data Not Found" });
        }
      } else {
        return res
          .status(400)
          .json({ data: null, message: "Please enter Token and Id" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getallchatusers: async (req, res) => {
    try {
      let { id } = req.query;
      let data = [];
      if (id) {
        id = id.trim();
        data = await adminModel.aggregate([
          {
            $match: {
              AdminId: mongoose.Types.ObjectId(id),
            },
          },

          {
            $lookup: {
              from: "customers",
              localField: "Chats.customer",
              foreignField: "_id",
              as: "result",
            },
          },
          {
            $project: {
              _id: 0,
              "result.full_name": 1,
              "result._id": 1,
              "result.chatstatus": 1,
            },
          },
          // {
          //   $unwind: {
          //   path:"$result"
          //   },
          // },
        ]);
      } else {
        data = await Customer.aggregate([
          {
            $match: { chatuser: true },
          },
          {
            $project: {
              full_name: 1,
              chatstatus: 1,
            },
          },
        ]);
      }

      if (data.length > 0) {
        return res
          .status(200)
          .json({ data, message: "Data Find Successfully" });
      } else {
        return res.status(404).json({ data, message: "Data Not Found" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getchatuserprofile: async (req, res) => {
    try {
      let { Roomid, usertype } = req.query;
      Roomid = Roomid.trim();
      let data = [];
      if (usertype == "client") {
        data = await Customer.aggregate([
          {
            $match: { _id: mongoose.Types.ObjectId(Roomid) },
          },
          // {
          //   $project: {
          //     full_name: 1,
          //     chatstatus: 1,
          //   },
          // },
        ]);
      } else if (usertype === "ws_login") {
        data = await CustomerByIp.aggregate([
          {
            $match: { _id: mongoose.Types.ObjectId(Roomid) },
          },
          // {
          //   $project: {
          //     full_name: 1,
          //     chatstatus: 1,
          //   },
          // },
        ]);
      }

      if (data.length > 0) {
        return res
          .status(200)
          .json({ data: data[0], message: "Data Find Successfully" });
      } else {
        return res.status(404).json({ data, message: "Data Not Found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ data: null, message: "Interval Server error" });
    }
  },
  getallmessages: async (req, res) => {
    try {
      let { Roomid } = req.query;
      if (Roomid) {
        Roomid = Roomid.trim();
        const data = await MessageModel.aggregate([
          {
            $match: {
              Roomid: mongoose.Types.ObjectId(Roomid),
            },
          },
        ]);
        if (data.length > 0) {
          return res
            .status(200)
            .json({ data, message: "Data Find Successfully" });
        } else {
          return res.status(404).json({ data, message: "Data Not Found" });
        }
      } else {
        throw new Error("Enter Room id");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  savemessage: async (req, res) => {
    try {
      const data = await MessageModel.create(req.body);

      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  },
  addRoomToAdminChat: async (req, res) => {
    try {
      const { userid } = req.body;
      let data;
      if (userid) {
        data = await adminModel.aggregate([
          {
            $match: {
              AdminId: ObjectId(userid),
            },
          },
          {
            $lookup: {
              from: "customerbyips",
              localField: "Chats.customerbyip",
              foreignField: "_id",
              as: "byip",
            },
          },
          {
            $lookup: {
              from: "customers",
              localField: "Chats.customer",
              foreignField: "_id",
              as: "result",
            },
          },
          {
            $project: {
              mergedData: { $concatArrays: ["$byip", "$result"] },
            },
          },
        ]);
      } else {
        throw "User Id is required";
      }
      if (data) {
        return res
          .status(200)
          .json({ data: data[0], message: "data get successfully" });
      } else if (!data) {
        return res
          .status(404)
          .json({ data: data, message: "data get successfully" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  },
  AddReadAndWrite: async (req, res) => {
    try {
      const { readMessages } = req.body;
      if (!readMessages || readMessages.length < 0) {
        return res.status(401).send("Please provide messages");
      } else {
        let promises = readMessages.map(async (item) => {
          let data = await MessageModel.findOneAndUpdate(
            {
              time: item.time,
              Roomid: mongoose.Types.ObjectId(item.Roomid),
              usertype: item.usertype,
              msg: item.msg,
            },
            {
              $set: {
                time: item.time,
                Roomid: mongoose.Types.ObjectId(item.Roomid),
                usertype: item.usertype,
                msg: item.msg,
                read: true,
              },
            }
          );
          return data;
        });
        Promise.all(promises)
          .then((promisesdata) => {
            return res.status(200).json({
              message: "updated data successfully",
              data: promisesdata,
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error.message });
          });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  },
  ListOfAllUnreadMessages: async (req, res) => {
    try {
      let { RoomIds, Userid } = req.body;
      let roomarray = RoomIds.map((item) => {
        return mongoose.Types.ObjectId(item);
      });

      let data = await MessageModel.aggregate([
        {
          $match: {
            userid: { $in: roomarray },
            read: false,
            usertype: "client",
          },
        },
        {
          $group: {
            _id: "$Roomid",
            read: { $last: "$read" },
            msg: { $last: "$msg" },
            count: { $sum: 1 },
          },
        },
      ]);

      if (data.length > 0) {
        return res.json(data);

        // You can return true or perform other actions as needed
      } else {
        // You can return false or perform other actions as needed
      }

      return res.json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  },
  CreateWsUser: async (req, res) => {
    try {
      let { username } = req.body;
      // // Find the latest user with a "visitor" full_name and get its number
      const Existuser = await CustomerByIp.findOne({
        full_name: username,
      });
      if (Existuser) {
        return res.status(200).json({ data: Existuser });
      } else if (!Existuser) {
        const latestVisitorUser = await CustomerByIp.findOne(
          {},
          {},
          { sort: { full_name: -1 } }
        );
        let nextVisitorNumber = 1; // Default for the first visitor user
        if (latestVisitorUser) {
          // If there is a latest visitor user, increment the number
          const latestNumber = latestVisitorUser.full_name;
          nextVisitorNumber = latestNumber + 1;
        }
        const newUser = new CustomerByIp({
          full_name: nextVisitorNumber,
          // Other user data
        });

        await newUser.save();

        return res.status(201).json({ data: newUser });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  },
  AddUserToChatAdmin: async (req, res) => {
    try {
      const { roomid, adminid, usertype } = req.body;
      let data;
      // let data;
      // if (usertype === "ws_login" && roomid && adminid) {
      //   data = await ChatsRoomsForAdminsModels.findOne({
      //     AdminId: mongoose.Types.ObjectId(adminid),
      //     "Chats.customerbyip": mongoose.Types.ObjectId(roomid),
      //   });
      //   if (data) {
      //   } else {
      //     data = await ChatsRoomsForAdminsModels.findOneAndUpdate(
      //       {
      //         AdminId: mongoose.Types.ObjectId(adminid),
      //       },
      //       {
      //         $push: {
      //           "Chats.customerbyip": roomid,
      //         },
      //       }
      //     );
      //   }
      // } else if (usertype === "client" && roomid && adminid) {
      //   data = await ChatsRoomsForAdminsModels.findOne({
      //     AdminId: mongoose.Types.ObjectId(adminid),
      //     "Chats.customer": mongoose.Types.ObjectId(roomid),
      //   });
      //   if (data) {
      //   } else {
      //     data = await ChatsRoomsForAdminsModels.findOneAndUpdate(
      //       {
      //         AdminId: mongoose.Types.ObjectId(adminid),
      //       },
      //       {
      //         $push: {
      //           "Chats.customer": roomid,
      //         },
      //       }
      //     );
      //   }
      // }
      if (usertype === "client" && roomid && adminid) {
        data = await ChatsRoomsForAdminsModels.findOne({
          AdminId: mongoose.Types.ObjectId(adminid),
          "Chats.customer": mongoose.Types.ObjectId(roomid),
        });

        if (data) {
          // The field exists, no need to modify the array.
          return res.json(data);
        } else {
          // The field does not exist, so add it to the array.
          data = await ChatsRoomsForAdminsModels.findOneAndUpdate(
            {
              AdminId: mongoose.Types.ObjectId(adminid),
            },
            {
              $push: {
                Chats: { customer: roomid },
              },
            }
          );
          return res.json(data);

        }
      } else if (usertype === "ws_login" && roomid && adminid) {
        data = await ChatsRoomsForAdminsModels.findOne({
          AdminId: mongoose.Types.ObjectId(adminid),
          "Chats.customerbyip": mongoose.Types.ObjectId(roomid),
        });

        if (data) {
          // The field exists, no need to modify the array.
          return res.json(data);
        } else {
          // The field does not exist, so add it to the array.
          data = await ChatsRoomsForAdminsModels.findOneAndUpdate(
            {
              AdminId: mongoose.Types.ObjectId(adminid),
            },
            {
              $push: {
                Chats: { customerbyip: roomid },
              },
            }
          );
          return res.json(data);
        }
      }


    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  },
  VerifyChatEmail: async (req, res) => {
    try {
      const { email, userid, usertype } = req.query;

      if (!email) {
        return res.status(401).json({ message: "Please provide an Email" });
      }

      const verifyPromise = new Promise((resolve, reject) => {
        verifier.verify(email, function (err, info) {
          if (err) {
            reject(err);
          } else {
            if (!info.success) {
              reject(new Error("Invalid Email"));
            } else {
              resolve(info);
            }
          }
        });
      });

      const info = await verifyPromise;
      console.log(info);
      if (usertype === "ws_login") {
        await CustomerByIp.findByIdAndUpdate(userid, {
          $set: {
            email: email,
          },
        });
      }
      return res.status(200).json({ message: "Email Verified Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  UpdateProfile: async (req, res) => {
    try {
      const { userid, usertype, email } = req.body;
      let data;

      if (usertype === "ws_login") {
        data = await CustomerByIp.findByIdAndUpdate(
          userid,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
      } else if (usertype === "client") {

        data = await Customer.findByIdAndUpdate(
          userid,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
      }
      return res.status(200).json({ data: data, message: "Data Updated Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};
