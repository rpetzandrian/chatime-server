const userRouter = require("./User");
const contactRouter = require("./Contact");
const chatroomRouter = require("./Chatroom");
const authRouter = require("./Auth");
const callRouter = require("./Call");
const messageRouter = require("./Message");

const app = (route, prefix) => {
  route.use(`${prefix}/users`, userRouter);
  route.use(`${prefix}/contacts`, contactRouter);
  route.use(`${prefix}/chatrooms`, chatroomRouter);
  route.use(`${prefix}/messages`, messageRouter);
  route.use(`${prefix}/auth`, authRouter);
  route.use(`${prefix}/call`, callRouter);
};

module.exports = app;
