import { Router } from 'express';

const UsersRouter = Router();


UsersRouter.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

UsersRouter.get('/', function (req, res, next) {
  res.json({ message: 'hello world' });
});

UsersRouter.get('/moha', function (req, res, next) {
  res.json({ message: 'hello moha' });
});

UsersRouter.get('/adnan', function (req, res, next) {
  res.json({ message: 'hello adnan' });
});

UsersRouter.get('/m', function (req, res, next) {
  res.json({ message: 'hello wxxxorld' });
});

export default UsersRouter;
