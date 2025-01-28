//auth.route.ts
import { auth } from "../config/auth.config"
import { Router } from 'express';

const AuthRouter = Router();

// Route de base pour vérifier que l'auth fonctionne
AuthRouter.get("/check", (req, res) => {
  res.json({ message: "Auth route working" });
});

// Middleware auth pour toutes les routes auth
AuthRouter.use("/*", auth);

export default AuthRouter;