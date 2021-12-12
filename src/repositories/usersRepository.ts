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

export async function create(name: string, classname: string): Promise<QueryResult> {
  const result = await connection.query(
    'INSERT INTO users (name, class) VALUES ($1, $2);',
    [name, classname],
  );
  return result;
}

