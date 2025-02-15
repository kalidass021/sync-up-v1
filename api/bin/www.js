import app from '../app.js';
import dbConnect from '../src/config/dbConnect.js';

const start = () => {
  try {
    const port = parseInt(process.env.PORT, 10) || 5000;
    const server = app.listen(port, () => {
      const url =
        process.env.NODE_ENV === 'development'
          ? `http://localhost:${port}`
          : process.env.API_URL;
      console.info(`Server is up and listening at ${url}`);
    });
    // connect to db
    dbConnect();

    return server; // server instance
  } catch (err) {
    console.error(`Startup Error: ${err}`);
    process.exit(1); // exit with failure
  }
};

start(); // attempt to start the server