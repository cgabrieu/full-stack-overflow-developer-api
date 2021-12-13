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

export async function getRanking(): Promise<User[]> {
  const result = await connection.query(
    `SELECT
        users.name,
        SUM(questions.points) AS points,
        COUNT(users.id) AS anwers
      FROM answers
      JOIN users
        ON answers.user_id = users.id
      JOIN questions
        ON answers.question_id = questions.id
      GROUP BY users.id
      ORDER BY SUM(questions.points) DESC;`,
  );
  
  return result.rows;
}