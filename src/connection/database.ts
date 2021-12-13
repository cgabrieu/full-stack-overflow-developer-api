import { Pool, PoolConfig } from 'pg';

let connectionData: PoolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === 'prod') {
  connectionData = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const connection: Pool = new Pool(connectionData);

export default connection;
