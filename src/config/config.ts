import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const NODE_ENV = process.env.NODE_ENV || 'development';

export const config = {
  mongo: {
    url: MONGO_URL,
  },

  server: {
    port: SERVER_PORT,
  },

  env: {
    NODE_ENV,
  }
}


