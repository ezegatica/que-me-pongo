import { Report } from '@prisma/client';
import React, { type JSX } from 'react';
import { Clothes, LowerType, UpperType, getDay, getHour } from '../../utils';
import ActionButtons from './action-buttons';

export default function ReportCard({
  report
}: {
  report: Report;
}): JSX.Element {
  const formattedDate = getDay(
    new Date(report.date.getTime() + report.dateTz * 1000)
  );

  const formattedHour = getHour(
    new Date(report.date.getTime() + report.dateTz * 1000)
  );

  const upper = Clothes.Upper[report.upper as UpperType];
  const lower = Clothes.Lower[report.lower as LowerType];

  return (
    <li className="col-span-1 divide-y divide-gray-900 rounded-lg bg-black/20 shadow">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium ">{formattedDate}</h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {report.temp}°C
            </span>
          </div>
          <p className="mt-1 truncate text-sm ">{formattedHour}</p>
          <p className="mt-1 text-sm">
            {upper.displayName} con unos {lower.displayName}
          </p>
        </div>
      </div>
      <div>
        <ActionButtons report={report} />
      </div>
    </li>
  );
}
