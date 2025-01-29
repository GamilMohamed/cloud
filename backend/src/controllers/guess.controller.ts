// import { getSession } from "@auth/express"
// import { NextFunction } from "express"
// import { authConfig } from "../config/auth.config"

// export async function authenticatedUser(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     const session = res.locals.session ?? (await getSession(req, authConfig))
//     if (!session?.user) {
//       res.redirect("/login")
//     } else {
//       next()
//     }
//   }