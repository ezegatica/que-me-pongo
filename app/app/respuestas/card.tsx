import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Report } from '@prisma/client';
import React from 'react';
import { Clothes, LowerType, UpperType } from '../../utils';

export default function ReportCard({ report }: { report: Report }) {
  const formattedDate = report.date.toLocaleDateString('es-AR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedHour = report.date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })

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
          <p className="mt-1 truncate text-sm ">
            {formattedHour}
          </p>
          <p className="mt-1 text-sm">
            {upper.displayName} con unos {lower.displayName}
          </p>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${''}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold "
            >
              <PencilSquareIcon className="h-5 w-5 " aria-hidden="true" />
              {/* Editar */}
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${''}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
            >
              <TrashIcon className="h-5 w-5 " aria-hidden="true" />
              {/* Eliminar */}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
