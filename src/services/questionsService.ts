import { Question } from '../protocols/Question';
import * as usersRepository from '../repositories/usersRepository';
import * as questionsRepository from '../repositories/questionsRepository';
import Invalid from '../errors/Invalid';
import { Answer } from '../protocols/Answer';
import formatDate from '../utils/formatDate';
import NotFound from '../errors/NotFound';

export async function create(questionBody: Question): Promise<number> {
  const { question, student, tags, class: classname } = questionBody;

  const existsUser = await usersRepository.findName(student);

  let userId = existsUser?.id;
  if (!userId) {
    userId = await usersRepository.create(student, classname);
  }

  const questionId = await questionsRepository.create(userId, question, tags);
  return questionId;
}

export async function getUnsolved(): Promise<Question[]> {
  const questions = await questionsRepository.getUnsolved();

  questions.forEach((question) => {
    question.submitAt = formatDate(question.submitAt);
  });

  return questions;
}

export async function getById(questionId: number): Promise<Question> {
  const question = await questionsRepository.getById(questionId);

  if (!question) {
    throw new NotFound('Question Not Found');
  }

  if (question.answered) {
    const answers = await questionsRepository.getAnswersByQuestionId(questionId);

    answers.forEach((answer) => {
      answer.answeredAt = formatDate(answer.answeredAt);
    });

    question.answers = answers;
  }
  question.submitAt = formatDate(question.submitAt);

  return question;
}

export async function createAnswer(answer: Answer): Promise<number> {
  const question = await questionsRepository.getById(answer.questionId);
  if (!question) {
    throw new NotFound('Question Not Found');
  }

  const answerId = await questionsRepository.createAnswer(answer);
  return answerId;
}

export async function vote(questionId: number, voteType: string) {
  const question = await questionsRepository.getById(questionId);
  if (!question) {
    throw new NotFound('Question Not Found');
  }
  
  const votedQuestion = await questionsRepository.vote(questionId, voteType);  
  return votedQuestion;
}