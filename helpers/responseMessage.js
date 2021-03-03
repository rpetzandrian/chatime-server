const responseMessage = (message, status, result) => {
  return {
    message: message,
    statusCode: status,
    data: result,
  };
};

module.exports = responseMessage;
