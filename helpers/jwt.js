const jwt = require("jsonwebtoken");

const verify = {
  verifyToken: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, "chatime123", function (err, decoded) {
        if (!err) {
          if (decoded.role == "Admin") next();
          else if (decoded.role == "User") next();
          else
            formResponse(
              {
                message: `Forbidden`,
                status: 403,
              },
              res
            );
        } else {
          formResponse(
            {
              message: err.message,
              status: 400,
            },
            res
          );
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
      jwt.verify(token, "chatime123", function (err, decoded) {
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
