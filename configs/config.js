import dotenv from 'dotenv'

dotenv.config();

const config = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
