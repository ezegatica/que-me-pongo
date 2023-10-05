import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ToastSwal = withReactContent(SweetAlert);

export const Toast = ToastSwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});

export const PopupSwal = withReactContent(SweetAlert);

export const Popup = PopupSwal.mixin({
  // customClass: {
  //   denyButton:
  //     'rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20',
  //   cancelButton:
  //     'rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600',
  //   confirmButton:
  //     'rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  // }
});
