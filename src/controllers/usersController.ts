import { Request, Response, NextFunction } from 'express';
import { User } from '../protocols/User';
import { createUserSchema } from '../schemas/usersSchemas';
import Invalid from '../errors/Invalid';
import httpStatusCode from '../enums/httpStatusCode';
import * as usersService from '../services/usersService';
import Conflict from '../errors/Conflict';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
  try {
    const createUserBody: User = req.body;

    const { error: invalidBody } = createUserSchema.validate(createUserBody);
    if (invalidBody) {
      throw new Invalid(invalidBody.message);
    }

    const token = await usersService.create(createUserBody);

    return res.status(httpStatusCode.CREATED).send({ token });
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatusCode.CONFLICT).send(error.message);
    return next();
  }
}

export async function getUserRanking(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
  try {
    const ranking = await usersService.getRanking();
    return res.status(httpStatusCode.OK).send(ranking);
  } catch (error) {
    if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
    if (error instanceof Conflict) return res.status(httpStatusCode.CONFLICT).send(error.message);
    return next();
  }
}