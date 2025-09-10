const sendResponse = (res, statusCode, message, data = null) => {
  const success = statusCode >= 200 && statusCode < 300;

  const responsePayload = {
    success,
    statusCode,
    message,
    ...(data && { data }),
    timeStamp: new Date().toISOString(),
  };

  return res.status(statusCode).json(responsePayload);
};

export default sendResponse;
