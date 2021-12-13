import { Router } from 'express';
import usersRouter from './routers/usersRouter';
import questionsRouter from './routers/questionsRouter';
import rankingRouter from './routers/rankingRouter';

const router: Router = Router();

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/ranking', rankingRouter);

export default router;
