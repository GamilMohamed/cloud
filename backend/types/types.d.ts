// types/express.d.ts
import { User } from "@auth/core/types"

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
