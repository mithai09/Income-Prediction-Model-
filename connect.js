const mongoose = require('mongoose');

// Replace 'your_database_name' with the actual name of your database
const dbName = 'db';

// Connection URL for MongoDB Community Server running locally
const url = `mongodb://localhost:27017/${dbName}`;

// Connect to MongoDB
mongoose.connect(url);

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.once('open', () => {
  console.log(`Connected to MongoDB: ${url}`);
});

// Event listener for connection errors
db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
});

// Event listener when the connection is disconnected
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Gracefully close the MongoDB connection on application termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  });
});

