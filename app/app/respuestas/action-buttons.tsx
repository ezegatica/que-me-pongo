'use client';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Report } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Popup } from '../../(components)/toast';
import { deleteReport } from './actions';

export default function ActionButtons({
  report
}: {
  report: Report;
}): JSX.Element {
  const router = useRouter();
  const onClickDelete = () => {
    Popup.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      html: 'Esta acción no se puede revertir.<br/>Si quieres cambiar una respuesta, simplemente editala.',
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Editar',
      cancelButtonText: 'Volver',
      showDenyButton: true,
      reverseButtons: true,
      showCancelButton: true
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          Popup.fire({
            title: 'Eliminando...',
            text: 'No salgas de la página',
            icon: 'info',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false
          });
          await deleteReport(report.id);
          Popup.fire('Eliminado con exito!', '', 'success');
        } catch (error) {
          Popup.fire('Error al eliminar', `${JSON.stringify(error)}`, 'error');
        } finally {
          router.refresh();
        }
      } else if (result.isDenied) {
        // LANZAR EDITAR
        Popup.close();
      }
    });
  };
  return (
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
        <button
          onClick={onClickDelete}
          className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
        >
          <TrashIcon className="h-5 w-5 " aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
