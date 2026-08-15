const mongoose = require('mongoose');

const connectDB = async (retries = 5) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`MongoDB connection attempt ${attempt}/${retries}...`);
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        console.error('All MongoDB connection attempts failed. Exiting.');
        process.exit(1);
      }
      const delay = Math.min(1000 * 2 ** attempt, 10000);
      console.log(`Retrying in ${delay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
module.exports = connectDB;