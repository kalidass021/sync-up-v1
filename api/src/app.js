import express from 'express';
import cookieParser from 'cookie-parser';

// files
import cors from './config/cors';
import cloudinaryConfig from './config/cloudinary';
import apiStatus from './utils/apiStatus';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

// routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import notificationRoutes from './routes/notificationRoutes';

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

app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/posts', postRoutes);
app.use('/v1/notifications', notificationRoutes);

// handle undefined routes
app.use(notFound);
// handle the errors
app.use(errorHandler);

export default app;