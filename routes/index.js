const userRouter = require("./User");

const app = (route, prefix) => {
  route.use(`${prefix}/users`, userRouter);
};

module.exports = app;
