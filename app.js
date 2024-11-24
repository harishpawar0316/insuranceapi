const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const apisRouter = require('./routes/api');
const { SocketService } = require("./helper/chat_helper/ChatService")
dotenv.config();
const app = express();
const port = process.env.PORT || 8005;

// Middleware
// app.use(history());
// app.use('/', express.static(__dirname + '/build'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/publicfiles', express.static(__dirname + '/publicfiles'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/user_profile', express.static(__dirname + '/user_profile'));
app.use("/documents", express.static("documents"));
app.use("/StepLogos", express.static("StepLogos"))
app.use('/api', apisRouter);
app.get("/", async (req, res) => {
  res.send("Server is Started at Port 8000")
})
app.use("/testimonials", express.static("testimonials"));
app.use("/claims", express.static("claims"));
app.use("/MakeMotorLogos", express.static("MakeMotorLogos"))
app.use("/YachtMakeLogos", express.static("YachtMakeLogos"))
app.use("/YachtEngineLogos", express.static("YachtEngineLogos"))
app.use("/TPAfiles", express.static("TPAfiles"))
app.use("/Member_files", express.static("Member_files"))
app.use("/UsefulLinks", express.static("UsefulLinks"))
app.use("/GroupClaimDocuments", express.static("GroupClaimDocuments"))
app.use("/Cmsuploads/banner", express.static("Cmsuploads/banner"))
app.use("/Cmsuploads/insurancedetail", express.static("Cmsuploads/insurancedetail"))
app.use("/Cmsuploads/knowmore", express.static("Cmsuploads/knowmore"))
const newLeads = require("./models/New_Lead")
let makeDetail = require("./models/Body_type")
// require("./helper/thirdPartyApi")
// require("./utils")
const contry = require("./models/Country")
const nationality = require("./models/Nationality")
const plan_type_details = require("./models/maternity_questionnaire")


// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected Successfully'))
  .catch((err) => console.error(err));


// Listening Server
const cluster = require("cluster");
// const totalCPUs = require("os").availableParallelism();
try {
  const server = require("http").createServer(app);
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  const corsOptions = {
    origin: "*"
  };

  // const io = require("socket.io")(server, {
  //   cors: corsOptions,
  // });
  // SocketService(io);
} catch (error) {
  console.error("Error during server and socket initialization:", error);
}
