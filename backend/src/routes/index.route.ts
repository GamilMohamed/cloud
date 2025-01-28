import { Router } from 'express';
import UsersRouter from './users.routes';

const router = Router();

// Définir la route '/' en premier
router.get('/', function (req, res, next) {
  res.json({ message: 'hesdasadsad' });
});

// Ensuite, utiliser UsersRouter pour '/users'
router.use('/users', UsersRouter);

export default router;
