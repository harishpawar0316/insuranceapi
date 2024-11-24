const { default: mongoose } = require("mongoose");
const AdminModel = require("../../models/Admin");
const RoomidModel = require("../../models/Chats/ChatRoomids");
const MessageModel = require("../../models/Chats/MessageModel");
const { Customer } = require("../../models/Customer");
var admin = require("firebase-admin");
var serviceAccount = require("./securitykeyjson");

// Initialize Firebase Admin SDK here
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.cert),
});

// Get connected sockets in a room
// const getConnectedSockets = async (io, roomid) => {
//   const connectedSockets = io.sockets.sockets;
//   for (const [socketId, socket] of connectedSockets) {
//     const { headers, time, address, query } = socket.handshake;
//     console.log("Socket ID:", socketId);
//     console.log("Query:", query?.Userid);
//     console.log("Query:", query?.usertype);

//     if (query.usertype !== "client") {
//       return;
//     } else if (query.usertype == "Document Chaser") {
//       io.to(socketId).emit("ForDocumentRooms", { roomid });
//     } else if (query.usertype == "Policy Issuer") {
//       io.to(socketId).emit("ForPolicyRooms", { roomid });
//     } else if (query.usertype == "Supervisor") {
//       io.to(socketId).emit("ForSupervisorRooms", { roomid });
//     } else if (query.usertype == "Superadmin") {
//       io.to(socketId).emit("ForSuperadminRooms", { roomid });
//     }
//   }
// };

// Send push notification to users
const PushNotification = async (userid) => {
  try {
    const tokens = await AdminModel.aggregate([
      {
        $match: { token: { $exists: true } },
      },
      {
        $project: {
          token: 1,
          _id: 0,
        },
      },
    ]);

    if (tokens.length > 0) {
      await Promise.all(
        tokens.map(async (data) => {
          const message = {
            notification: {
              title: "New user",
              body: `Click <a href="http://localhost:3001/chat/${userid}">here</a> to view`,
            },
            data:{
              Roomid:userid
            },
            token: data.token,
          };

          try {
            const response = await admin.messaging().send(message);
            console.log("Push notification sent successfully:", response);
          } catch (error) {
            console.error("Error sending push notification:", error);
          }
        })
      );
    } else {
      console.log("No tokens found in the database.");
    }
  } catch (error) {
    console.log(error);
  }
};

const Messagereciverfirebase = async (socket, io, Userid) => {
  try {
    // Handle receiving messages from clients
    socket.on("message", async (newMessage) => {
      io.in(newMessage?.Roomid).emit("message", newMessage);
    });
    // End  Handle receiving messages from clients
    // Join Room
    socket.on("joinRoom", async ({ Roomid, usertype, userid }) => {
      console.log("connectedRoom: " + Roomid, "usertype: " + usertype);
      // Check Room Size When Room Size is greater then two then Disallowed to join room
      const roomSize = io.sockets.adapter.rooms.get(Roomid)?.size || 0;
      console.log("roomSize", roomSize);
      if (roomSize >= 2) {
        let message = "Room is already full.";
        socket.emit("roomFull", message);
      } else {
        socket.join(Roomid);
        // if usert is client then send firebase cloud notification to all agents
        if (usertype === "client") {
          await PushNotification(Roomid);
          // Check if Room is Already Exist
          const existRoom = await RoomidModel.findOne({ roomid_id: Userid });
          if (existRoom) {
            await RoomidModel.findOneAndUpdate(
              { roomid_id: Userid },
              { status: "online" }
            );
          }
          // Check if Room is Not Exist
          else {
            let id = mongoose.Types.ObjectId(Userid);
            await RoomidModel.create({ roomid_id: id, status: "online" });
            const newMessage = {
              msg: "Welcome to Last Minute Policy!",
              usertype: "System",
              username: "Support",
              time: Date.now(),
            };
            io.in(Roomid).emit("welcome", newMessage);
          }
        } else {
          io.in(Roomid).emit("status", {
            Roomid: Userid,
            msg: `${usertype} Join`,
            status: "online",
          });
          await AdminModel.findByIdAndUpdate(Userid, {
            adminstatus: "online",
          });
        }
      }
    });
    // End  Join Room
  } catch (error) {
    console.log(error);
  }
};

// Handle socket connections and disconnections
const SocketService = (io) => {
  io.on("connection", async (socket) => {
    try {
      const { Userid, usertype } = socket.handshake.query;
      if (Userid && usertype) {
        await Messagereciverfirebase(socket, io, Userid);
      }

      socket.on("disconnect", async (reason) => {
        console.log("disconnected: " + Userid, usertype);
        if (Userid && usertype) {
          io.in(Userid).emit("userleft", {
            Roomid: Userid,
            msg: `${usertype} left`,
            status: "offline",
          });
          let id = mongoose.Types.ObjectId(Userid);
          await MessageModel.create({ Roomid: id, msg: `${usertype} left` });
          await RoomidModel.findOneAndUpdate(
            { roomid_id: Userid },
            { status: "offline" }
          );
          await AdminModel.findByIdAndUpdate(Userid, {
            adminstatus: "offline",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { SocketService };
