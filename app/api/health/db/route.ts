import { prisma } from '../../../db';

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = false;

export const GET = async (): Promise<Response> => {
  try {
    // execute 1 + 1 query to check if the database connection is healthy
    const [result, user, lastReport] = await Promise.all([
      prisma.$queryRaw`SELECT 1 + 1`,
      prisma.user.count(),
      prisma.report.findFirst({
        orderBy: {
          date: 'desc'
        }
      })
    ]);
    return Response.json({
      message: 'Database connection is healthy',
      result,
      userCount: user,
      lastReport: lastReport?.date
    });
  } catch (error) {
    return Response.json({
      message: JSON.stringify(error),
      result: null
    });
  }
};
