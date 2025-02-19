//index.route.ts
import { Router } from 'express';
import AuthRouter from './auth.route';
import CloudRouter from './cloud.route';
import GuessRouter from './guess.route';

const router = Router();

router.get('/', function (req, res, next) {
  res.redirect('http://localhost:4000/');
  // res.json({ message: 'hesdasadsad' });
});

router.use('/api/auth', AuthRouter);
router.use('/api/clouds', CloudRouter);
router.use('/api/guess', GuessRouter);


export default router;
