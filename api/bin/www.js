import serverConfig from '../server.js';

const start = () => {
  try {
    const server = serverConfig(); // attempt to start the server
    return server; // server instance
  } catch (err) {
    console.error(`Startup Error: ${err}`);
    process.exit(1); // exit with failure
  }
};

start();