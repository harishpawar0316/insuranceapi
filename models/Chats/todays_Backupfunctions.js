const ChatsRoomsForAdmins = require("../../models/Chats/ChatsRoomsForAdmins");
const ChatsRoomsForAllAdmins = require("../../models/Chats/ChatsRoomsForAllAdmins");
const AdminModel = require("../../models/Admin");
var admin = require("firebase-admin");
const mongoose = require("mongoose");
var serviceAccount = require("./securitykeyjson");
var Objectid = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.secretOrKey;
const { Customer } = require("../../models/Customer");
const usertypes = require("./usertypes.json");
const CustomerByIp = require("../../models/Chats/CustomerByIp");
const AddRoomid = async (userid, roomid) => {
  return new Promise(async (resolve, reject) => {
    let data;
    console.log("run AddRoomid");
    try {
      let exists = await await ChatsRoomsForAdmins.findOne({
        AdminId: Objectid(userid),
        "Chats.customer": Objectid(roomid),
      });
      console.log({ exists });
      if (exists) {
        data = await ChatsRoomsForAdmins.findOne({
          AdminId: Objectid(userid),
        }).populate({
          path: "Chats.customer",
          select: ["full_name", "chatstatus"],
        });
      } else if (!exists) {
        data = await ChatsRoomsForAdmins.findOneAndUpdate(
          {
            AdminId: Objectid(userid),
          },
          {
            $push: { Chats: [{ customer: roomid }] }, // Use $addToSet to avoid duplicates
            // $set: { isBusy: true },
          },
          {
            new: true,
          }
        ).populate({
          path: "Chats.customer",
          select: ["full_name", "chatstatus"],
        });
      }

      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
const AddRoomidToCustomerByip = async (userid, roomid) => {
  return new Promise(async (resolve, reject) => {
    let data;
    console.log("run AddRoomid");
    try {
      let exists = await await ChatsRoomsForAdmins.findOne({
        AdminId: Objectid(userid),
        "Chats.customerbyip": Objectid(roomid),
      });
      console.log({ exists });
      if (exists) {
        data = await ChatsRoomsForAdmins.findOne({
          AdminId: Objectid(userid),
        });
      } else if (!exists) {
        data = await ChatsRoomsForAdmins.findOneAndUpdate(
          {
            AdminId: Objectid(userid),
          },
          {
            $push: { Chats: [{ customerbyip: roomid }] }, // Use $addToSet to avoid duplicates
            // $set: { isBusy: true },
          }
        );
      }

      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
const VerifySocketToken = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(token);
      if (!token) {
        reject({ message: "A token is required for authentication" });
      }
      let decode_token = jwt.verify(token, JWT_KEY);
      let current_user = await Customer.findById(decode_token.id);
      resolve(current_user._id);
    } catch (error) {
      console.log(error);
      if (error instanceof jwt.TokenExpiredError) {
        reject({ message: "Sesssion Expired" });
        return res
          .status(401)
          .json({ status: 401, message: "Sesssion Expired" });
      } else {
        reject({ message: "Invalid Token" });
      }
    }
  });
};
// Initialize Firebase Admin SDK here
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.cert),
});
const SendOnlineUsers = (io, Roomid, username) => {
  try {
    // Get all users in the room
    console.log(Roomid);

    const clientsInRoom = io.sockets.adapter.rooms.get(Roomid);
    console.log("                 ", clientsInRoom);
    if (clientsInRoom) {
      // Array to store connected client data
      let arrayofconnectedclients = [];
      // Iterate through connected clients
      for (const clientId of clientsInRoom) {
        const clientSocket = io.sockets.sockets.get(clientId);
        const { query } = clientSocket.handshake;
        delete query["transport"];
        delete query["EIO"];
        delete query["t"];
        if (query.usertype === "client") {
          query["Userid"] = Roomid;
          query["username"] = username;
        }
        arrayofconnectedclients.push(query);
      }
      // Emit the "online_users" event to all clients in the room
      arrayofconnectedclients = removeDuplicates(arrayofconnectedclients);
      io.in(Roomid).emit("online_users", arrayofconnectedclients);
    }
  } catch (error) {
    console.log(error);
  }
};
const removeDuplicates = (arr) => {
  try {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  } catch (error) {
    return error.message;
  }
};
const addChatidForSpecificAdminForTransfer = async (
  Userid,
  roomid,
  socketId,
  usertype,
  io,
  eventname
) => {
  try {
    const getRoomiddata = await AddRoomid(Userid, roomid);
    io.to(socketId).emit("getTransferChat", getRoomiddata);
    const chatAdmin = await ChatsRoomsForAdmins.findOne({
      AdminId: Objectid(Userid),
      isBusy: false,
    });
    if (chatAdmin) {
      const message = {
        notification: {
          title: "New user",
          body: `Click <a href="http://localhost:3001/chat/${roomid}">here</a> to view`,
        },
        data: {
          Roomid: roomid,
        },
        token: chatAdmin.token,
      };
      await admin.messaging().send(message);
    }
  } catch (error) {
    console.log({ error });
  }
};
const addChatidForSpecificAdmin = async (
  Userid,
  roomid,
  socketId,
  usertype,
  io
) => {
  try {
    // console.log("get roomids", getRoomiddata);
    io.to(socketId).emit("getUserFromJoinRoom", "getUserFromJoinRoom");
    const chatAdmin = await ChatsRoomsForAdmins.findOne({
      AdminId: Objectid(Userid),
      // isBusy: false,
    });
    if (chatAdmin) {
      const message = {
        notification: {
          title: "New user",
          body: `Click <a href="http://localhost:3001/chat/${roomid}">here</a> to view`,
        },
        data: {
          Roomid: roomid,
        },
        token: chatAdmin.token,
      };
      await admin.messaging().send(message);
    }
  } catch (error) {
    console.log(error, "error from add add agent");
  }
};
const FireBasePushNotification = async (
  Userid,
  usertype,
  roomid,
  io,
  eventname,
  socket,
  location
) => {
  try {
    const connectedSockets = io.sockets.sockets;
    if (eventname === "transferChat") {
      for (const [socketId, socket] of connectedSockets) {
        const { query } = socket.handshake;
        let connectedusertype = query.usertype;
        let senderusertype = usertype;
        if (senderusertype == usertypes.super_visor) {
          if (
            connectedusertype !== usertypes.super_visor &&
            connectedusertype == usertypes.sales_advisor
          ) {
            console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdminForTransfer(
              query.Userid,
              roomid,
              socketId,
              connectedusertype,
              io
            );
          }
        } else if (senderusertype == usertypes.sales_advisor) {
          if (
            connectedusertype !== usertypes.sales_advisor &&
            connectedusertype == usertypes.document_chaser
          ) {
            console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdminForTransfer(
              query.Userid,
              roomid,
              socketId,
              connectedusertype,
              io
            );
          }
        } else if (senderusertype == usertypes.document_chaser) {
          if (
            connectedusertype !== usertypes.document_chaser &&
            connectedusertype == usertypes.policy_issuer
          ) {
            console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdminForTransfer(
              query.Userid,
              roomid,
              socketId,
              connectedusertype,
              io
            );
          }
        }
      }
    } else if (eventname === "joinRoom") {
      console.log("join room >>>>>>");
      if (usertype == "client") {
        socket.join(roomid);

        // Send Roomid To Connected Agents
        socket.broadcast.emit("userjoin", {
          Roomid: roomid,
          chatstatus: true,
        });
        await Customer.findByIdAndUpdate(roomid, {
          chatstatus: true,
          $set: { location: location },
        });
        // const matchRoomid = await ChatsRoomsForAllAdmins.aggregate([
        //   {
        //     $match: { "Chats.customer": Objectid(roomid) },
        //   },
        // ]);
        // // console.log("matchRoomid", matchRoomid);
        // if (matchRoomid.length > 0) {
        //   console.log("already exist");
        // } else {
        //   await ChatsRoomsForAllAdmins.updateMany(
        //     {},
        //     { $push: { Chats: { customer: roomid } } }
        //   );
        // }
        for (const [socketId, socket] of connectedSockets) {
          const { query } = socket.handshake;
          let senderusertype = query.usertype;

          if (senderusertype == usertypes.super_visor) {
            console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io
            );
          } else if (senderusertype == usertypes.sales_advisor) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io
            );
          } else if (senderusertype == usertypes.document_chaser) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io
            );
          }
        }
      } else if (usertype == "ws_login") {
        console.log("user is witghought login");
        socket.join(roomid);
        // Send Roomid To Connected Agents
        socket.broadcast.emit("userjoin", {
          Roomid: roomid,
          chatstatus: true,
        });
        await CustomerByIp.findByIdAndUpdate(roomid, {
          chatstatus: true,
          $set: { location: location },
        });
        //  const matchRoomid = await ChatsRoomsForAllAdmins.aggregate([
        //    {
        //      $match: { "Chats.customerbyip": Objectid(roomid) },
        //    },
        //  ]);
        //  // console.log("matchRoomid", matchRoomid);
        //  if (matchRoomid.length > 0) {
        //    console.log("already exist");
        //  } else {
        //    await ChatsRoomsForAllAdmins.updateMany(
        //      {},
        //      { $push: { Chats: { customerbyip: roomid } } }
        //    );
        //  }
        for (const [socketId, socket] of connectedSockets) {
          const { query } = socket.handshake;
          let senderusertype = query.usertype;

          if (senderusertype == usertypes.super_visor) {
            console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io
            );
          } else if (senderusertype == usertypes.sales_advisor) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io
            );
          } else if (senderusertype == usertypes.document_chaser) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io
            );
          }
        }
      } else if (usertype !== "client" && usertype !== "ws_login") {
        socket.join(roomid);
        await AddRoomidToCustomerByip(Userid, roomid);
        socket.emit("latest_users", d);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  transferChat: async (socket, io, Userid) => {
    try {
      const { Userid, usertype } = socket.handshake.query;
      // Join Room
      socket.on("transferChat", async ({ Roomid, usertype, username }) => {
        // Send Online Users To Device;
        SendOnlineUsers(io, Roomid, username);
        // send firebase cloud notification to all agents
        await FireBasePushNotification(
          Userid,
          usertype,
          Roomid,
          io,
          (eventname = "transferChat"),
          socket,
          (location = null)
        );
      });
      // End  Join Room
      // End  Assign Roomid To Uper Agent
    } catch (error) {
      console.log(error);
    }
  },
  OnTyping: async (io, socket) => {
    try {
      // Join Room
      socket.on("istyping", (data) => {
        io.in(data.Roomid).emit("usertyping", data);
      });
      // End  Join Room
      // End  Assign Roomid To Uper Agent
    } catch (error) {
      console.log(error);
    }
  },
  handleMessages: (socket, io) => {
    // Handle receiving messages from clients
    try {
      socket.on("message", async (newMessage) => {
        const desiredRoom = newMessage.Roomid;

        // Check if the socket is already in the desired room
        if (!socket.rooms[desiredRoom]) {
          socket.join(desiredRoom);
        }

        io.in(desiredRoom).emit("message", newMessage);
      });
    } catch (error) {
      console.log(error);
    }

    // Handle receiving messages from clients
  },
  OnDisconnect: async (socket, io) => {
    try {
      const { Userid, usertype, token } = socket.handshake.query;
      socket.on("disconnect", async (reason) => {
        console.log("disconnected: " + Userid, usertype);
        if (Userid && usertype === "client") {
          if (token) {
            await VerifySocketToken(token)
              .then(async (response) => {
                socket.broadcast.emit("userleft", {
                  Roomid: Userid,
                  chatstatus: false,
                });
                console.log("disconnected user response", response);
                await Customer.findByIdAndUpdate(response, {
                  chatstatus: false,
                });
              })
              .catch((error) => {
                console.log({ error });
              });
          }
        } else if (Userid && usertype === "ws_login") {
          if (token) {
            socket.broadcast.emit("userleft", {
              Roomid: Userid,
              chatstatus: false,
            });
            console.log("disconnected user response", response);
            await CustomerByIp.findByIdAndUpdate(Userid, {
              chatstatus: false,
            });
          }
        } else if (Userid && usertype !== "client" && usertype !== "ws_login") {
          await ChatsRoomsForAdmins.findOneAndUpdate(
            { AdminId: Objectid(Userid) },
            {
              isBusy: false,
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  joinRoom: async (socket, io, Userid) => {
    try {
      // Join Room
      socket.on(
        "joinRoom",
        async ({ Roomid, usertype, username, location }) => {
          // Send Online Users To Device;
          SendOnlineUsers(io, Roomid, username);
          // Check if Room is Already Exist
          if (usertype === "ws_login") {
            console.log("some one come", {
              Roomid,
              usertype,
              username,
              location,
            });
            const existRoom = await CustomerByIp.findById(Roomid);
            console.log("exist room ", existRoom);
            if (existRoom) {
              io.in(Roomid).emit("chatstatus", {
                Roomid: Userid,
                msg: `${usertype} Join`,
                chatstatus: true,
              });
              // Send Roomid To Connected Agents
              await FireBasePushNotification(
                Userid,
                usertype,
                Roomid,
                io,
                (eventname = "joinRoom"),
                socket,
                location
              );
            }
          } else if (usertype === "client") {
            const existRoom = await Customer.findOne({ _id: Roomid });
            if (existRoom) {
              io.in(Roomid).emit("chatstatus", {
                Roomid: Userid,
                msg: `${usertype} Join`,
                chatstatus: true,
              });
            }

            // Send Roomid To Connected Agents
            await FireBasePushNotification(
              Userid,
              usertype,
              Roomid,
              io,
              (eventname = "joinRoom"),
              socket,
              location
            );
          }
          io.in(Roomid).emit("chatstatus", {
            Roomid: Userid,
            msg: `${usertype} Join`,
            chatstatus: true,
          });

          // }
        }
      );
      // End  Join Room
    } catch (error) {
      console.log(error);
    }
  },
};
