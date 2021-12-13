import dayjs from 'dayjs'
import { Question } from '../protocols/Question';
import * as usersRepository from '../repositories/usersRepository';
import * as questionsRepository from '../repositories/questionsRepository';
import Invalid from '../errors/Invalid';
import { Answer } from '../protocols/Answer';

export async function create(questionBody: Question): Promise<number> {
  const { question, student, tags, class: classname } = questionBody;

  const existsUser = await usersRepository.findName(student);

  let userId = existsUser?.id;
  if (!userId) {
    userId = await usersRepository.create(student, classname);
  }

  const questionId = await questionsRepository.create(userId, question, tags);
  if (questionId) return questionId;

  throw new Invalid('Invalid data, unable to create question');
}

export async function getUnsolved(): Promise<Question[]> {
  const questions = await questionsRepository.getUnsolved();

  questions.forEach((question) => {
    question.submitAt = `${dayjs(question.submitAt).format('YYYY-MM-DD HH:mm')}`;
  });

  return questions;
}

export async function getById(questionId: number): Promise<Question> {
  const question = await questionsRepository.getById(questionId);

  if (question.answered) {
    question.answers = await questionsRepository.getAnswersByQuestionId(questionId);
  }
  
  return question;
}

export async function createAnswer(answer: Answer): Promise<number> {
  const answerId = await questionsRepository.createAnswer(answer);
  return answerId;
}