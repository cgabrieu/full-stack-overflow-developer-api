import { Request, Response, NextFunction } from 'express';
import CreateUserBody from '../protocols/CreateUserBody';
import { createUserSchema } from '../schemas/usersSchemas'
import Invalid from '../errors/Invalid';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const createUserBody: CreateUserBody = req.body;

        const { error: invalidBody } = createUserSchema.validate(createUserBody);
        if (invalidBody) {
            throw new Invalid(invalidBody.message);
        }

        
    }
}
