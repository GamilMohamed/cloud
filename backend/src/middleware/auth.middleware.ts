// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "../config/auth.config";

// Middleware pour protéger une route
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
   const session = res.locals.session ?? (await getSession(req, authConfig))
  if (!session?.user) {
	res.status(401).json({ error: "Non autorisé" });
  } else {
    next()
  }
}
