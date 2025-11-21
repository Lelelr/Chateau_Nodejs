const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/castle-shop');
    console.log('Connected to MongoDB Castle Shop database');
    } catch (err) {
    console.error('Error connecting to MongoDB Castle Shop database:', err);
    }
};

module.exports = connectDB;



