import dbConnect from '../config/dbConnect';

(async () => {
  try {
    // connect to db
    await dbConnect();
    const { default: startServer } = await import('../server.js');
    startServer(); // attempt to start the server
  } catch (err) {
    console.error(`Startup Error: ${err}`);
    process.exit(1); // exit with failure
  }
})();