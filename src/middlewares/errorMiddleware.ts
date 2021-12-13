import { Request, Response, NextFunction } from "express";
import httpStatusCode from "../enums/httpStatusCode";

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(`Error - ${err.message}`);
  return next();
}
