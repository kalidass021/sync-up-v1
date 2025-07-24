import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

// files
import { cors, cloudinaryConfig } from './config';
import { apiStatus } from './utils';
import { notFound, errorHandler } from './middlewares';

// constants
import { ROUTES } from './constants/appConstants';

// routes
import {
  authRoutes,
  userRoutes,
  postRoutes,
  notificationRoutes,
} from './routes';

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
app.get(ROUTES.ROOT, apiStatus);

app.use(ROUTES.AUTH, authRoutes);
app.use(ROUTES.USERS, userRoutes);
app.use(ROUTES.POSTS, postRoutes);
app.use(ROUTES.NOTIFICATIONS, notificationRoutes);

app.use(notFound); // handle undefined routes
app.use(errorHandler); // handle errors

const startServer = () => {
  const port = parseInt(process.env.PORT, 10) || 5000;
  const server = app.listen(port, () => {
    const url =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${port}`
        : process.env.API_URL;
    console.info(`Server is up and listening at ${url}`);
  });

  return server;
};

export default startServer;
