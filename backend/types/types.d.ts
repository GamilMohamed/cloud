// types/express.d.ts
import { User } from "@auth/core/types"

declare global {
  namespace Express {
    interface Request {
      user?: User; 
      // ou n'importe quel type renvoyé par session.user (ex: { id: string; email?: string } etc.)
    }
  }
}
