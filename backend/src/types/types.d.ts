// types.d.ts
import { User } from "@auth/core/types"; // Assure-toi d'importer le bon type User depuis ton système d'authentification

declare module 'express' {
  interface Request {
    user?: User; // Ajoute la propriété `user` à l'objet `Request`
  }
}