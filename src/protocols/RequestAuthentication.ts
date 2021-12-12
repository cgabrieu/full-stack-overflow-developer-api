import { Request } from 'express';

export default interface RequestAuthentication extends Request {
    userId: number,
}