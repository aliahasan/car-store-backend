import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
dotenv.config();
async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
server();
