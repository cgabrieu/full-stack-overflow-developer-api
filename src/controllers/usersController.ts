import { Request, Response, NextFunction } from 'express';
import CreateUserBody from '../protocols/CreateUserBody';
import { createUserSchema } from '../schemas/usersSchemas'
import Invalid from '../errors/Invalid';
import httpStatusCode from '../enums/httpStatusCode';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const createUserBody: CreateUserBody = req.body;

        const { error: invalidBody } = createUserSchema.validate(createUserBody);
        if (invalidBody) {
            throw new Invalid(invalidBody.message);
        }

        return res.send(createUserBody);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Invalid) return res.status(httpStatusCode.BAD_REQUEST).send(error.message);
        return next();
    }
}
