import { Pool } from 'pg';

const pool = new Pool({
  user: 'adriano',
  host: 'localhost',
  database: 'apitest',
  password: '4321',
  port: 5432,
});

export default pool;
