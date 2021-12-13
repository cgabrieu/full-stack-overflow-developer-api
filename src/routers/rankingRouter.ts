import { Router } from 'express';
import * as usersController from '../controllers/usersController';

const router: Router = Router();

export default router.get('/', usersController.getUserRanking);
