const responseMessage = require("../helpers/responseMessage");

const errUserExist = (err, req) => {
  if (err.detail == `Key (username)=(${req.name}) already exists.`) {
    return responseMessage("Username already exists", 400, {});
  }
  if (err.detail == `Key (email)=(${req.email}) already exists.`) {
    return responseMessage("Email already exists", 400, {});
  }
  if (err.detail == `Key (phone)=(${req.phone}) already exists.`) {
    return responseMessage("Phone number already exists", 400, {});
  }
};

module.exports = errUserExist;
