import '../setup';
import connection from '../connection/database';
import { User } from '../protocols/User';

export async function findName(name: string): Promise<User> {
  const result = await connection.query(
    'SELECT * FROM users WHERE name = $1;',
    [name],
  );
  return result.rows[0];
}

export async function create(name: string, classname: string): Promise<number> {
  const result = await connection.query(
    'INSERT INTO users (name, class) VALUES ($1, $2) RETURNING id;',
    [name, classname],
  );

  return result.rows[0].id;
}

