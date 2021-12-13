import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const router: Router = Router();

router.post('/', questionsController.createQuestion);
router.get('/', questionsController.getUnsolvedQuestions);
router.post('/:id', authenticationMiddleware, questionsController.postQuestionAnswer);
router.get('/:id', questionsController.getQuestionById);
router.put('/:id/up-vote', questionsController.putVoteQuestion);
router.put('/:id/down-vote', questionsController.putVoteQuestion);

export default router;