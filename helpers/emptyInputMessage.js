const emptyInputMessage = (res) => {
  res.status(400).send({
    message: "Input is empty or not valid",
    statusCode: 400,
    data: [],
  });
};

module.exports = emptyInputMessage;
