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

const VerifySocketToken = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!token) {
        reject({ message: "A token is required for authentication" });
      }
      let decode_token = jwt.verify(token, JWT_KEY);
      let current_user = await Customer.findById(decode_token.id);
      resolve(current_user._id);
    } catch (error) {
      console.error(error);
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
    const clientsInRoom = io.sockets.adapter.rooms.get(Roomid);
    console.log("clientsInRoom", clientsInRoom);
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
    console.error(error);
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
  username,
  location,
  clientusertype,
  IpAddress,
  UserAgent
) => {
  try {
    let roomobj = {
      _id: roomid,
      full_name: username,
      chatstatus: true,
      location: location,
      usertype: clientusertype,
      IpAddress,
      UserAgent,
    };
    io.to(socketId).emit("getUserFromJoinRoom", roomobj);
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
    console.error({ error });
  }
};
const addChatidForSpecificAdmin = async (
  Userid,
  roomid,
  socketId,
  usertype,
  io,
  username,
  location,
  clientusertype,
  IpAddress,
  UserAgent
) => {
  try {
    let roomobj = {
      _id: roomid,
      full_name: username,
      chatstatus: true,
      location: location,
      usertype: clientusertype,
      IpAddress,
      UserAgent,
    };
    console.log("Aaya kya bhai", roomobj);
    io.to(socketId).emit("getUserFromJoinRoom", roomobj);
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
    console.error(error, "error from add add agent");
  }
};
const FireBasePushNotification = async (
  Userid,
  usertype,
  roomid,
  io,
  eventname,
  socket,
  username,
  location,
  clientusertype,
  IpAddress,
  UserAgent,
  deviceDetails
) => {
  try {
    const connectedSockets = io.sockets.sockets;
    if (eventname === "transferChat") {
      await addChatidForSpecificAdminForTransfer(
        query.Userid,
        roomid,
        socketId,
        connectedusertype,
        io,
        username,
        location,
        (clientusertype = "client")
      );
      /* for (const [socketId, socket] of connectedSockets) {
        const { query } = socket.handshake;
        let connectedusertype = query.usertype;
        let senderusertype = usertype;
        if (senderusertype == usertypes.super_visor) {
          if (
            connectedusertype !== usertypes.super_visor &&
            connectedusertype == usertypes.sales_advisor
          ) {
            // console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdminForTransfer(
              query.Userid,
              roomid,
              socketId,
              connectedusertype,
              io,
              username,
              location,
              (clientusertype = "client")
            );
          }
        } else if (senderusertype == usertypes.sales_advisor) {
          if (
            connectedusertype !== usertypes.sales_advisor &&
            connectedusertype == usertypes.document_chaser
          ) {
            // console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdminForTransfer(
              query.Userid,
              roomid,
              socketId,
              connectedusertype,
              io,
              username,
              location,
              (clientusertype = "client")
            );
          }
        } else if (senderusertype == usertypes.document_chaser) {
          if (
            connectedusertype !== usertypes.document_chaser &&
            connectedusertype == usertypes.policy_issuer
          ) {
            // console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdminForTransfer(
              query.Userid,
              roomid,
              socketId,
              connectedusertype,
              io,
              username,
              location,
              (clientusertype = "client")
            );
          }
        }
      }
      */
    } else if (eventname === "joinRoom") {
      const newMessage = {
        msg: "Welcome to the last minute Policy",
        usertype: "System",
        username: "Support",
        Roomid: roomid,
        time: Date.now(),
        userid: null,
        read: true,
      };
      console.log("usertype>>>>>>>>>>>>>>>>.123123123", usertype);
      if (usertype == "client") {
        socket.join(roomid);
        SendOnlineUsers(io, roomid, username);
        // Send Roomid To Connected Agents
        socket.broadcast.emit("userjoin", {
          Roomid: roomid,
          chatstatus: true,
          IpAddress,
          UserAgent,
          deviceDetails,
        });

        io.in(roomid).emit("message", newMessage);
        newMessage["msg"] =
          "You will be notified of a reply here and by email:";
        newMessage["usertype"] = "email";
        io.in(roomid).emit("email", newMessage);

        await Customer.findByIdAndUpdate(roomid, {
          chatstatus: true,
          $set: { location: location, IpAddress, UserAgent, deviceDetails },
        });

        for (const [socketId, socket] of connectedSockets) {
          const { query } = socket.handshake;
          let senderusertype = query.usertype;
          console.log("senderusertype", senderusertype);
          if (senderusertype == usertypes.super_visor) {
            console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io,
              username,
              location,
              (clientusertype = "client"),
              IpAddress,
              UserAgent
            );
          } else if (senderusertype == usertypes.sales_advisor) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io,
              username,
              location,
              (clientusertype = "client"),
              IpAddress,
              UserAgent
            );
          } else if (senderusertype == usertypes.document_chaser) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io,
              username,
              location,
              (clientusertype = "client"),
              IpAddress,
              UserAgent
            );
          }
        }
      } else if (usertype == "ws_login") {
        socket.join(roomid);
        // Send Roomid To Connected Agents
        SendOnlineUsers(io, roomid, username);
        socket.broadcast.emit("userjoin", {
          Roomid: roomid,
          chatstatus: true,
          IpAddress,
          UserAgent,
        });
        io.in(roomid).emit("message", newMessage);
        newMessage["msg"] =
          "You will be notified of a reply here and by email:";
        newMessage["usertype"] = "email";
        io.in(roomid).emit("email", newMessage);
        await CustomerByIp.findByIdAndUpdate(roomid, {
          chatstatus: true,
          $set: { location: location, IpAddress, UserAgent, deviceDetails },
        });

        for (const [socketId, socket] of connectedSockets) {
          const { query } = socket.handshake;
          let senderusertype = query.usertype;
          console.log("senderusertype", senderusertype);
          if (senderusertype == usertypes.super_visor) {
            console.log("sender is super visor and receiver is sales advisor");
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io,
              username,
              location,
              clientusertype,
              IpAddress,
              UserAgent
            );
          } else if (senderusertype == usertypes.sales_advisor) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io,
              username,
              location,
              clientusertype,
              IpAddress,
              UserAgent
            );
          } else if (senderusertype == usertypes.document_chaser) {
            await addChatidForSpecificAdmin(
              query.Userid,
              roomid,
              socketId,
              senderusertype,
              io,
              username,
              location,
              clientusertype,
              IpAddress,
              UserAgent
            );
          }
        }
      } else if (usertype !== "client" && usertype !== "ws_login") {
        socket.join(roomid);
        SendOnlineUsers(io, roomid, username);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  transferChat: async (socket, io) => {
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
      console.error(error);
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
      console.error(error);
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
      socket.on("unread_messages", async (newMessage) => {
        socket.broadcast.emit("unread_messages", newMessage);
      });
    } catch (error) {
      console.error(error);
    }

    // Handle receiving messages from clients
  },
  OnDisconnect: async (socket, io, connectedClients) => {
    try {
      const { Userid, usertype, token } = socket.handshake.query;
      // console.log("disconect>>>>>>>>>>>>>>>", { Userid, usertype, token });
      disconnectConnectedClients(socket, usertype, Userid, connectedClients);
      socket.on("disconnect", async (reason) => {
        if (Userid && usertype === "client") {
          if (token) {
            await VerifySocketToken(token)
              .then(async (response) => {
                socket.broadcast.emit("userleft", {
                  Roomid: Userid,
                  chatstatus: false,
                });
                await Customer.findByIdAndUpdate(response, {
                  chatstatus: false,
                });
              })
              .catch((error) => {
                console.error({ error });
              });
          }
        } else if (Userid && usertype === "ws_login") {
          if (token) {
            socket.broadcast.emit("userleft", {
              Roomid: Userid,
              chatstatus: false,
            });
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
      console.error(error);
    }
  },
  joinRoom: async (socket, io, Userid, IpAddress, UserAgent, deviceDetails) => {
    try {
      // Join Room
      socket.on(
        "joinRoom",
        async ({ Roomid, usertype, username, location }) => {
          await FireBasePushNotification(
            Userid,
            usertype,
            Roomid,
            io,
            (eventname = "joinRoom"),
            socket,
            username,
            location,
            (clientusertype = usertype),
            IpAddress,
            UserAgent,
            deviceDetails
          );
          io.in(Roomid).emit("chatstatus", {
            Roomid: Userid,
            msg: `${usertype} Join`,
            chatstatus: true,
            IpAddress,
            UserAgent,
            deviceDetails,
          });
        }
      );
      // End  Join Room
    } catch (error) {
      console.error(error);
    }
  },
};
