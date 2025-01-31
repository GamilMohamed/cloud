//auth.route.ts
import { auth } from "../config/auth.config"
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.use("/*", auth);

export default AuthRouter;