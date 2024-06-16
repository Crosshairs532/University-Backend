import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL as string,
  defaultPassword: process.env.defaultPassword,
  saltround: process.env.SALT_ROUND,
  jwt_secret: process.env.jwt_secret,
  jwt_refresh_token: process.env.jwt_refresh_token,
};
