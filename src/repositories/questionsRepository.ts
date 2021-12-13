import '../setup';
import connection from '../connection/database';

export async function create(userId: number, question: string, tags: string): Promise<number> {
  const result = await connection.query(
    'INSERT INTO questions (user_id, question, tags) VALUES ($1, $2, $3) RETURNING id;',
    [userId, question, tags],
  );

  return result.rows[0].id;
}

