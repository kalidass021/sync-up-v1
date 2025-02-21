import express from 'express';
import cookieParser from 'cookie-parser';

// files
import cors from './config/cors.js';
import cloudinaryConfig from './config/cloudinary.js';
import apiStatus from './utils/apiStatus.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

// routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();

// configurations
cloudinaryConfig();

// middlewares
app.use(cors);
// increase the payload size to handle larger base64 images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// handle api base url to show api status
app.get('/', apiStatus);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// handle undefined routes
app.use(notFound);
// handle the errors
app.use(errorHandler);

export default app;