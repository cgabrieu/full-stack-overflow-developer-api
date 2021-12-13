import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router: Router = Router();

router.post('/', questionsController.createQuestion);
router.get('/', questionsController.getUnsolvedQuestions);

export default router;