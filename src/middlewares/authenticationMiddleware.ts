import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatusCode from '../enums/httpStatusCode';
import RequestAuthentication from '../protocols/RequestAuthentication';

export default async function authenticationMiddleware(req: RequestAuthentication, res: Response, next: NextFunction) {
  const authorization = req.header('Authorization');
  const token = authorization?.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(httpStatusCode.UNAUTHORIZED);
    req.userId = decoded.userId;
    return next();
  });
}