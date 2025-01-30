// src/types/express.d.ts
import { User } from "@auth/core/types" // ou le type exact que tu veux stocker

// Si le type de `user` dans la session est plus précis, tu peux l’indiquer ici
// Par exemple : type MyUser = { id: string; email?: string }

declare global {
  namespace Express {
    interface Request {
      // user?: MyUser
      user?: User
    }
  }
}
