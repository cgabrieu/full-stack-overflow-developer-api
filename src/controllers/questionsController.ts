import { Request, Response, NextFunction } from 'express';
import { User } from '../protocols/User';
import { createQuestionSchema } from '../schemas/questionsSchemas';
import Invalid from '../errors/Invalid';
import httpStatusCode from '../enums/httpStatusCode';
import * as questionsService from '../services/questionsService';
import * as usersService from '../services/usersService';
import Conflict from '../errors/Conflict';
import { Question } from '../protocols/Question';

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