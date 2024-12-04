// packages
import express from 'express';
import dotenv from 'dotenv';

// files
import dbConnect from './src/config/dbConnect.js';

// configurations
dotenv.config();

// routes

const app = express();

// middlewares

// handle base api url to show api status
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

const serverConfig = () => {
  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.info(`Server is up and listening at ${url}`);
  });
  // connect to db
  dbConnect();

  return server;
};

export default serverConfig;
