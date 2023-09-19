import { PrismaClient } from '@prisma/client';

declare const global: { prisma?: PrismaClient };

export const prisma: PrismaClient =
  global.prisma || new PrismaClient({ log: ['query', 'info', 'warn'] });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
