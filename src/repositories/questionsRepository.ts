import '../setup';
import connection from '../connection/database';
import { Question } from '../protocols/Question';
import { Answer } from '../protocols/Answer';

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

export async function createAnswer({ userId, questionId, answer }: Answer): Promise<number> {
  const result = await connection.query(
    'INSERT INTO answers (user_id, question_id, answer) VALUES ($1, $2, $3) RETURNING id;',
    [userId, questionId, answer],
  );

  await connection.query(
    'UPDATE questions SET answered = true WHERE id = $1;',
    [questionId],
  );

  return result.rows[0].id;
}
