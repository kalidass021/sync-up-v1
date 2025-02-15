const apiStatus = (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: 'API is working!',
    environment: process.env.NODE_ENV,
  });
};

export default apiStatus;
