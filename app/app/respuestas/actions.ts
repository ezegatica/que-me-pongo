'use server';

import { authOptions } from '../../auth';
import { prisma } from '../../db';
import { getUser } from '../../utils';

export async function deleteReport(reportId: number): Promise<void> {
  const report = await prisma.report
    .findUniqueOrThrow({
      where: {
        id: reportId
      }
    })
    .catch(() => {
      throw new Error('El reporte no fue encontrado');
    });

  const { user } = await getUser(authOptions);
  if (report.userId !== user.id) {
    throw new Error('No tienes permisos para realizar esta acción');
  }

  await prisma.$transaction([
    prisma.report.delete({
      where: {
        id: reportId
      }
    }),
    prisma.rawReport.delete({
      where: {
        id: report.rawReportId
      }
    })
  ]);
}
