//index.route.ts
import { Router } from 'express';
import UsersRouter from './users.route';
import AuthRouter from './auth.route';
import CloudRouter from './cloud.route';

const router = Router();

router.get('/', function (req, res, next) {
  res.redirect('http://localhost:4000/uploadcloud');
  // res.json({ message: 'hesdasadsad' });
});

router.use('/api/auth', AuthRouter);
router.use('/api/clouds', CloudRouter);


//test
router.use('/users', UsersRouter);



export default router;
