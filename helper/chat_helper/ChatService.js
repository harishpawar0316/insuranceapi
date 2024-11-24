const {
  transferChat,
  OnDisconnect,
  handleMessages,
  joinRoom,
  OnTyping,
  SendOnlineUsers,
} = require("./functions");
const DeviceDetector = require("node-device-detector");
const ChatsRoomsForAdmins = require("../../models/Chats/ChatsRoomsForAdmins");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.secretOrKey;
const { Customer } = require("../../models/Customer");
const usertypes = require("./usertypes.json");
const CustomerByIp = require("../../models/Chats/CustomerByIp");
const userTypeModels = require("../../models/User_type");
const AdminModels = require("../../models/Admin");

const connectedClients = [];
const sendConnectedClients = async(socket, usertype, Userid,io) => {
  try {
    if (usertype !== "ws_login" && usertype !== "client") {
      const findUser = connectedClients.find((item) => item.Userid === Userid);
      if (findUser) {
        return;
      } else if (!findUser) {
   
        let d=null;
         if ( Userid) {
          //  let d = await AdminModels.findById(Userid)
            d = await AdminModels.aggregate([
              {
                $match: { _id: mongoose.Types.ObjectId(Userid) },
              },
              {
                $lookup: {
                  from: "usertypes",
                  localField: "usertype",
                  foreignField: "_id",
                  as: "user",
                },
              },
              {
                $unwind: {
                  path: "$user",
                },
              },
              {
                $project: {
                  name: 1,
                  "user.usertype": 1,
                  _id: 1,
                },
              },
            ]);
           console.log("dd>>>>>>>>>>>>>>>>>",d)
           let data = await userTypeModels.findById(usertype);
           if (data) {
             usertypename = data.usertype;
           }
         }
        connectedClients.push({
          clientId: socket.id,
          Userid,
          userdetails:d?d[0]:null
        });
      }
    }
 
     socket.broadcast.emit("newClientConnected", connectedClients);
   usertype !== "ws_login" && usertype !== "client" && io.in(socket.id).emit("newClientConnected", connectedClients);
  } catch (error) {
    console.log(error);
  }
};
const disconnectConnectedClients = (
  socket,
  usertype,
  Userid,
) => {
  try {
    if (usertype !== "ws_login" && usertype !== "client") {
      const index = connectedClients.findIndex(
        (item) => item.Userid === Userid
      );
      console.log("findindex", index);
      if (index !== -1) {
        // only splice array when item is found
        connectedClients.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    console.log("connectedClients>>>>>>>", connectedClients);
    socket.broadcast.emit("newClientConnected", connectedClients);
  } catch (error) {
    console.log(error);
  }
};
// Handle socket connections and disconnections
const SocketService = (io) => {
  io.on("connection", async (socket) => {
    try {
      const { Userid, usertype,token } = socket.handshake.query;
      sendConnectedClients(socket, usertype, Userid,io);
      const IpAddress = socket.request.connection.remoteAddress;
      const UserAgent = socket.request.headers["user-agent"];
      let deviceDetails;
      const detector = new DeviceDetector({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: false,
      });
      //  get device details from user
      if (UserAgent) {
        deviceDetails = detector.detect(UserAgent);
      }
      //  notify user
      socket.on("notifytouser", (data) => {
        socket.broadcast.emit("notifytouserfromagent", data);
      });
      socket.on("message-read", ({ Roomid, updateMessages }) => {
        socket.broadcast.emit("message-read", {
          Roomid,
          updateMessages,
        });
      });
      socket.on("email-send", ({ Roomid, updateMessages }) => {});

      // Join Room
      joinRoom(socket, io, Userid, IpAddress, UserAgent, deviceDetails);
      // transfer Chat
      transferChat(socket, io, Userid, IpAddress, UserAgent, deviceDetails);
      // Handle Messages
      OnTyping(io, socket);
      // Handle Messages
      handleMessages(socket, io);
      // On Disconnect
      socket.on("disconnect", async (reason) => {
       
          disconnectConnectedClients(
            socket,
            usertype,
            Userid,
            connectedClients
          );
        if (Userid && usertype === "client") {
          if (token) {
            await VerifySocketToken(token)
              .then(async (response) => {
                 SendOnlineUsers(io, Userid,response.full_name);
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
        } 
        // else if (Userid && usertype !== "client" && usertype !== "ws_login") {
        //   await ChatsRoomsForAdmins.findOneAndUpdate(
        //     { AdminId: mongoose.Types.ObjectId(Userid) },
        //     {
        //       isBusy: false,
        //     }
        //   );
        // }
      });
      // Logout
      socket.on("logout", (data) => {
        socket.leave(data.Roomid);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { SocketService };
