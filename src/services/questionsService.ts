import { Question } from '../protocols/Question';
import * as usersRepository from '../repositories/usersRepository';
import * as questionsRepository from '../repositories/questionsRepository';
import Invalid from '../errors/Invalid';
import * as dayjs from 'dayjs'

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
    question.submitAt = 
  });

  return questions;
}
