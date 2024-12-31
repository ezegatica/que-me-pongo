import { prisma } from '../../../db';

export const GET = async (): Promise<Response> => {
  try {
    // execute 1 + 1 query to check if the database connection is healthy
    const result = await prisma.$queryRaw`SELECT 1 + 1`;
    return Response.json({ message: 'Database connection is healthy', result });
  } catch (error) {
    return Response.json({
      message: 'Database connection is unhealthy',
      result: null
    });
  }
};
