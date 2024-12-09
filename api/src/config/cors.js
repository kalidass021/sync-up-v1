import cors from 'cors';

const corsConfig = {
  origin: [process.env.CLIENT_URL_DEV, process.env.CLIENT_URL_PROD], // allow dev and prod origins
  credentials: true,
};

export default cors(corsConfig);
