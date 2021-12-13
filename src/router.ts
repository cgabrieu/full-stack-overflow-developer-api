import { Router } from 'express';
import usersRouter from './routers/usersRouter';
import questionsRouter from './routers/questionsRouter';

const router: Router = Router();

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);

export default router;
