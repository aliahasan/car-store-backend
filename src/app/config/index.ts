import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
   port: process.env.PORT || 3000,
   database_uri: process.env.DATABASE_URI,
};
