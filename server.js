const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

const socketio = require("socket.io");
const server = require("http").createServer(app);
const io = socketio(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5001",
      "http://chatime-app.mooo.com",
      "https://chatime-app.mooo.com",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(express.static("public"));

let whitelist = [
  "http://localhost:8000",
  "http://127.0.0.1:5500",
  "http://localhost:5001",
  "http://chatime-app.mooo.com",
  "https://chatime-app.mooo.com",
];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require("./routes");
router(app, "/api/v1");
// const db = require("./helpers/connection_db");

io.on("connection", (socket) => {
  // socket.on('online', id => {
  //   db.query(`UPDATE user_status set is_online = true where user_id =${id}`, err => {
  //     if (!err) {
  //       socket.broadcast.emit("online", { some: "data" });
  //     }
  //   })
  // })
  // socket.on('offline', id => {
  //   db.query(`UPDATE user_status set is_online = false where user_id =${id}`, err => {
  //     if (!err) {
  //       socket.broadcast.emit("offline", { some: "data" });
  //     }
  //   })
  // })

  socket.on("join", (data) => {
    socket.join(data.roomId);
  });
  socket.on("send message", (data) => {
    io.to(data.chatroom_id).emit("message", data);
  });
});

app.get("/", (req, res) => {
  res.send({
    message: "Home",
  });
});

app.get("*", (req, res) => {
  res.status(404).send({
    message: "Page not found",
    statuscode: 404,
  });
});

// server.listen(port)
server.listen(port, () => {
  console.log(`Server started on https://${process.env.HOST}:${port}`);
});
