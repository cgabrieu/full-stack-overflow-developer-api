import { Request, Response, Router } from 'express';

const router = Router();

router.get('/check', (req: Request, res: Response) => {
  res.send({
    message: 'Running.',
  });
});

export default router;