// // middleware/auth.middleware.ts
// import { Request, Response, NextFunction } from 'express';
// import { auth } from "@auth/express"

// export const requireAuth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const session = await auth(req, res);
//   if (!session) {
//     return res.status(401).json({ error: 'Non autorisé' });
//   }
//   req.user = session.user; // TypeScript pourrait se plaindre ici, il faudra étendre le type Request
//   next();
// };