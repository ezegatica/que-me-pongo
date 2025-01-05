'use client';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Report } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { type JSX, useState } from 'react';
import WeatherForm from '../(form)/form';
import { Popup } from '../../(components)/toast';
import { deleteReport } from './actions';

export default function ActionButtons({
  report
}: {
  report: Report;
}): JSX.Element {
  const [showEdit, setShowEdit] = useState(false);
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
        Popup.close();
        setShowEdit(true);
      }
    });
  };

  return (
    <>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="flex w-0 flex-1">
          <button
            onClick={() => setShowEdit(true)}
            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold "
          >
            <PencilSquareIcon className="h-5 w-5 " aria-hidden="true" />
          </button>
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

      <Transition show={showEdit} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowEdit}>
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-white"
                      >
                        Registro de atuendo
                      </DialogTitle>
                      <div className="mt-2">
                        <WeatherForm
                          report={report}
                          onSubmit={() => setShowEdit(false)}
                        />
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
