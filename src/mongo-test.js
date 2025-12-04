const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect('mongodb://localhost:27017/testdb');

    console.log('Connected to MongoDB');

    // Simple test model
    const Test = mongoose.model(
      'Test',
      new mongoose.Schema({
        name: String
      })
    );

    // Create a test document
    const doc = await Test.create({ name: 'Connection works' });

    console.log('Document saved:', doc);

    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('MongoDB error:', err);
  }
}

testConnection();