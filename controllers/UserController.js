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
};

module.exports = UserController;
