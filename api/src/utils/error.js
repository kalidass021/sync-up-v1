// function to handle the custom errors
// when we don't have and error in the system but, we want to add the error

const error = (statusCode, message) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.message = message;
  delete err.stack; // remove the stack trace for custom errors
  return err;
};

export default error;
