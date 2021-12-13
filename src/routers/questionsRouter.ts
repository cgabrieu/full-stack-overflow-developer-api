import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router: Router = Router();

export default router.post('/', questionsController.createQuestion);
