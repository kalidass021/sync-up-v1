import app from '../app.js';
import dbConnect from '../config/dbConnect.js';

const start = async () => {
  try {
    // connect to db
    await dbConnect();

    const port = parseInt(process.env.PORT, 10) || 5000;
    const server = app.listen(port, () => {
      const url =
        process.env.NODE_ENV === 'development'
          ? `http://localhost:${port}`
          : process.env.API_URL;
      console.info(`Server is up and listening at ${url}`);
    });

    return server;
  } catch (err) {
    console.error(`Startup Error: ${err}`);
    process.exit(1); // exit with failure
  }
};

start(); // attempt to start the server
