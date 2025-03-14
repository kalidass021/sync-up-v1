import mongoose from 'mongoose';

const dbConnect = async () => {
  // get default connection
  const db = mongoose.connection;

  // handle errors after initial connection
  db.on('error', (err) => {
    console.error(`Mongo DB runtime error: ${err.message}`);
  });

  db.once('open', () => {
    console.info('Connected to Mongo DB 👍');
  });

  // connect to mongo db
  await mongoose.connect(process.env.MONGO_URI);
};

export default dbConnect;
