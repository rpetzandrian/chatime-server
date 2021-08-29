const authModel = require("../models/Auth");

const AuthController = {
  register: async (req, res) => {
    try {
      const result = await authModel.register(req.body);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const result = await authModel.login(req.body);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = AuthController;
