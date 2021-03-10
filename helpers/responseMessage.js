const responseMessage = (message, status, result = null) => {
  return result !== null
    ? {
        message: message,
        statusCode: status,
        data: result,
      }
    : {
        message: message,
        statusCode: status,
      };
};

module.exports = responseMessage;
