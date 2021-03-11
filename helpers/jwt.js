const jwt = require("jsonwebtoken");

const verify = {
  verifyUser: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (!err) {
          if (decoded.role == "User") next();
          else
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
        } else {
          res.status(400).send({
            message: err.message,
            statusCode: 400,
          });
        }
      });
    }
  },

  verifyUserWithId: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (!err) {
          if (decoded.role == "User" && decoded.id == req.params.id) next();
          else
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
        } else {
          res.status(400).send({
            message: err.message,
            statusCode: 400,
          });
        }
      });
    }
  },

  isAdminVerify: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (!err) {
          if (decoded.role == "Admin") next();
          else
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
        } else {
          res.status(400).send({
            message: err.message,
            statusCode: 400,
          });
        }
      });
    }
  },
};

module.exports = verify;
