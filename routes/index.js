const userRouter = require("./User");
const contactRouter = require("./Contact");
const chatRouter = require("./Chat");

const app = (route, prefix) => {
  route.use(`${prefix}/users`, userRouter);
  route.use(`${prefix}/contacts`, contactRouter);
  route.use(`${prefix}/chats`, chatRouter);
};

module.exports = app;
