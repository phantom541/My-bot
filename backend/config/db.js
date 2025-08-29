const mongoose = require('mongoose');

// Hardcoded for now due to .env file issues
const MONGO_URI = "mongodb://localhost:27017/my-bot-panel";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    // Don't exit the process, just log the error
    // This allows the server to stay up for API testing even without a DB connection
    console.error('Could not connect to MongoDB:', err.message);
  }
};

module.exports = connectDB;
