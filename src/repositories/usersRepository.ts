import '../setup';
import { QueryResult } from 'pg';
import connection from '../connection/database';
import { User } from '../protocols/User';

export async function findName(name: string): Promise<QueryResult<User>> {
  const result = await connection.query(
    'SELECT * FROM users WHERE name = $1;',
    [name],
  );
  return result.rows[0];
}