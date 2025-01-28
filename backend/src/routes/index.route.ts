//index.route.ts
import { Router } from 'express';
import UsersRouter from './users.route';
import AuthRouter from './auth.route';

const router = Router();

// Définir la route '/' en premier
router.get('/', function (req, res, next) {
  res.json({ message: 'hesdasadsad' });
});

// Utiliser AuthRouter pour '/auth'
router.use('/api/auth', AuthRouter);

router
// Ensuite, utiliser UsersRouter pour '/users'
router.use('/users', UsersRouter);

export default router;
