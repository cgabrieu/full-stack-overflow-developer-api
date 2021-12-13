import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const router: Router = Router();

router.post('/', questionsController.createQuestion);
router.get('/', questionsController.getUnsolvedQuestions);
router.post('/:id', authenticationMiddleware, questionsController.postQuestionAnswer);

export default router;