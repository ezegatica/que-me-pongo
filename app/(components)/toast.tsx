import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(SweetAlert);

export const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});

export const Popup = withReactContent(SweetAlert);
