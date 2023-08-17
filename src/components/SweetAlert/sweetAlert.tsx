import React from 'react';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import colors from '../../styles/_colors.scss';

const MySwal = withReactContent(Swal);

interface Props extends SweetAlertOptions {
  variant?: SweetAlertIcon;
  showCancelButton?: boolean;
  confirmCallback?: () => void;
}

export const sweetAlert = ({ variant = 'warning', showCancelButton = true, confirmCallback, ...props }: Props) => {
  MySwal.fire({
    icon: variant,
    color: 'white',
    background: colors.sweet_alert_background,

    confirmButtonText: 'Eliminar',
    confirmButtonColor: colors.error,

    showCancelButton,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: colors.tertiary,

    ...props
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback && confirmCallback();
    }
  });
};
