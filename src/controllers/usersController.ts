import { Request, Response, NextFunction } from 'express';
import CreateUserBody from '../protocols/CreateUserBody';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const createUserBody: CreateUserBody = req.body;

    }
}
