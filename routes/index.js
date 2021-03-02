const userRouter = require("./User");
const contactRouter = require("./Contact");

const app = (route, prefix) => {
  route.use(`${prefix}/users`, userRouter);
  route.use(`${prefix}/contacts`, contactRouter);
};

module.exports = app;
