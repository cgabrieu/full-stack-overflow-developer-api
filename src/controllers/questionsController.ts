import { Request, Response, NextFunction } from 'express';
import { createAnswerSchema, createQuestionSchema } from '../schemas/questionsSchemas';
import Invalid from '../errors/Invalid';
import httpStatusCode from '../enums/httpStatusCode';
import * as questionsService from '../services/questionsService';
import Conflict from '../errors/Conflict';
import { Question } from '../protocols/Question';
import RequestAuthentication from '../protocols/RequestAuthentication';

export async function createQuestion(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
  try {
    const questionBody: Question = req.body;

    const { error: invalidBody } = createQuestionSchema.validate(questionBody);
    if (invalidBody) {
      throw new Invalid(invalidBody.message);
    }

    const questionId = await questionsService.create(questionBody);
    return res.status(httpStatusCode.CREATED).send({ id: questionId });
  } catch (error) {
    console.error(error);
    if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatusCode.CONFLICT).send(error.message);
    return next();
  }
}

export async function getUnsolvedQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const questions = await questionsService.getUnsolved();

    return res.status(httpStatusCode.OK).send(questions);
  } catch (error) {
    console.error(error);
    return next();
  }
}

export async function postQuestionAnswer(req: RequestAuthentication, res: Response, next: NextFunction) {
  try {
    const { error: invalidBody } = createAnswerSchema.validate(req.body);
    if (invalidBody) {
      throw new Invalid(invalidBody.message);
    }

    const { answer } = req.body;

    await questionsService.postAnswer(answer);

    return res.status(httpStatusCode.CREATED).send({
      message: 'Successfully Answered.'
    });
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
    console.error(error);
    return next();
  }
}