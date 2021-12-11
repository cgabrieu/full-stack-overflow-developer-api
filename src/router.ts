import { Request, Response, Router } from 'express';
import usersRouter from './routers/usersRouter';

const router = Router();

router.use('/check', usersRouter);

export default router;
