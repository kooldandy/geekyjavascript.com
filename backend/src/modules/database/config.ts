import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});
