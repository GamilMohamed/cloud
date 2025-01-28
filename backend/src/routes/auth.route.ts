import { auth } from "../config/auth.config"
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.use("/*", auth)

// AuthRouter.get('/', function (req, res, next) {
// 	  res.json({ message: 'hello world' });
// });

export default AuthRouter;