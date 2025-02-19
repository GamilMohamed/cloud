import e, { Request, Response, NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "../config/auth.config";

export async function addSessionIfExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = res.locals.session ?? (await getSession(req, authConfig));

  if (session?.user) {
    //@ts-ignore
    req.user = session.user;
  }
  next();
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = res.locals.session ?? (await getSession(req, authConfig));

  if (!session?.user) {
    res.status(401).json({ error: "Non autorisé" });
  } else {
    //@ts-ignore
    req.user = session.user;
    next();
  }
}