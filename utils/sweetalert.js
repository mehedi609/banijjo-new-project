import swal from 'sweetalert';

export const sweetAlert = (text, title = 'Warning', icon = 'warning') => {
  swal({
    title: 'Warning!',
    text,
    icon: 'warning',
    timer: 4000,
    button: false,
  });
};
