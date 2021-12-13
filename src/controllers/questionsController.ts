import { Request, Response, NextFunction } from 'express';
import { createAnswerSchema, createQuestionSchema } from '../schemas/questionsSchemas';
import Invalid from '../errors/Invalid';
import httpStatusCode from '../enums/httpStatusCode';
import * as questionsService from '../services/questionsService';
import Conflict from '../errors/Conflict';
import { Question } from '../protocols/Question';
import RequestAuthentication from '../protocols/RequestAuthentication';
import { Answer } from '../protocols/Answer';
import NotFound from '../errors/NotFound';

export async function createQuestion(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
  try {
    const questionBody: Question = req.body;

    const { error: invalidBody } = createQuestionSchema.validate(questionBody);
    if (invalidBody) {
      throw new Invalid(invalidBody.message);
    }

    const result = await questionsService.create(questionBody);
    return res.status(httpStatusCode.CREATED).send(result);
  } catch (error) {
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
    return next();
  }
}

export async function getQuestionById(req: Request, res: Response, next: NextFunction) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId) || questionId < 1) {
      throw new Invalid('Invalid Question Id');
    }

    const question = await questionsService.getById(questionId);

    return res.status(httpStatusCode.OK).send(question);
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
    if (error instanceof NotFound) return res.status(httpStatusCode.NOT_FOUND).send(error.message);
    return next();
  }
}

export async function postQuestionAnswer(req: RequestAuthentication, res: Response, next: NextFunction) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId) || questionId < 1) {
      throw new Invalid('Invalid Question Id');
    }

    const { error: invalidBody } = createAnswerSchema.validate(req.body);
    if (invalidBody) {
      throw new Invalid(invalidBody.message);
    }

    const answer: Answer = {
      userId: req.userId,
      questionId,
      answer: req.body.answer,
    };

    const answerId = await questionsService.createAnswer(answer);

    return res.status(httpStatusCode.CREATED).send({
      message: `Successfully Answered - Answer Id: ${answerId}.`,
    });
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
    if (error instanceof NotFound) return res.status(httpStatusCode.NOT_FOUND).send(error.message);
    return next();
  }
}

export async function putVoteQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId) || questionId < 1) {
      throw new Invalid('Invalid Question Id');
    }

    const voteType = req.url.includes('up-vote') ? '+' : '-';
    await questionsService.vote(questionId, voteType);

    return res.status(httpStatusCode.OK).send({
      message: `Voted ${voteType}1 Successfully`,
    });
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
    if (error instanceof NotFound) return res.status(httpStatusCode.NOT_FOUND).send(error.message);
    return next(error);
  }
}