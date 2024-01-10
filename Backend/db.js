const mongoose = require('mongoose');
const DB = 'mongodb://0.0.0.0:27017/inotebook';

const connection = async () => {
  try {
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = connection;
