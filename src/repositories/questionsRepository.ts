import '../setup';
import connection from '../connection/database';
import { Question } from '../protocols/Question';

export async function create(userId: number, question: string, tags: string): Promise<number> {
  const result = await connection.query(
    'INSERT INTO questions (user_id, question, tags) VALUES ($1, $2, $3) RETURNING id;',
    [userId, question, tags],
  );

  return result.rows[0].id;
}

export async function getUnsolved(): Promise<Question[]> {
  const result = await connection.query(
    `SELECT questions.id, questions.question, users.name AS student, users.class, questions.submit_at AS "submitAt"
      FROM questions
      JOIN users
        ON questions.user_id = users.id
      WHERE answered = false;`,
  );

  return result.rows;
}
