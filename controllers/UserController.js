const UserModel = require("../models/User");
const userModel = require("../models/User");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await userModel.getAllUsers();
      res.status(200).send({
        message: "Success get all users",
        statusCode: 200,
        data: result,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
        statusCode: 500,
      });
    }
  },

  addNewUser: async (req, res) => {
    if (req.body.email == "" || req.body.password == "") {
      try {
        const result = await userModel.addNewUser(req.body);
        res.status(200).send({
          message: result.message,
          statusCode: result.statusCode,
        });
      } catch (err) {
        res.status(500).send({
          message: err.message,
          statusCode: 500,
        });
      }
    } else {
      res.status(400).send({
        message: "Email or password is empty",
        statusCode: 400,
      });
    }
  },
};

module.exports = UserController;
