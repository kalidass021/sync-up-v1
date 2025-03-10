import express from 'express';
import cookieParser from 'cookie-parser';

// files
import { cors, cloudinaryConfig } from './config';
import { apiStatus } from './utils';
import { notFound, errorHandler } from './middlewares';

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
app.get('/', apiStatus);

app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/posts', postRoutes);
app.use('/v1/notifications', notificationRoutes);

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
