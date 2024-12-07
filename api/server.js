// packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

// files
import dbConnect from './src/config/dbConnect.js';
import errorHandler from './src/middlewares/errorHandler.js';

// configurations
dotenv.config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// routes
import authRoutes from './src/routes/authRoutes.js';

const app = express();

// middlewares
app.use(
  cors({
    origin: ['http://localhost:5173'], // Allow dev
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// handle base api url to show api status
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

app.use('/api/v1/auth', authRoutes);

// middleware to handle the errors
app.use(errorHandler);

// middleware to handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
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
