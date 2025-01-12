// packages
import express from 'express';
import cookieParser from 'cookie-parser';

// files
import dbConnect from './src/config/dbConnect.js';
import cors from './src/config/cors.js';
import cloudinaryConfig from './src/config/cloudinary.js';
import notFound from './src/middlewares/notFound.js';
import errorHandler from './src/middlewares/errorHandler.js';

// configurations
cloudinaryConfig();

// routes
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js';

const app = express();

// middlewares
app.use(cors);
// increase the payload size to handle larger base64 images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// handle base api url to show api status
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/posts', postRoutes);
app.use('/v1/notifications', notificationRoutes);

// middleware to handle undefined routes
app.use(notFound);
// middleware to handle the errors
app.use(errorHandler);

const serverConfig = () => {
  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => {
    const url =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${port}`
        : process.env.API_URL;
    console.info(`Server is up and listening at ${url}`);
  });
  // connect to db
  dbConnect();

  return server;
};

export default serverConfig;
