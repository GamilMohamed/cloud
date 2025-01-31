//prisma.ts
import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
// export const prisma = globalForPrisma.prisma || new PrismaClient()
 
export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Active les logs
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma