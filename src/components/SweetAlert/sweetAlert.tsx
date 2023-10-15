import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import colors from '../../styles/_colors.scss';

const MySwal = withReactContent(Swal);

interface Props extends SweetAlertOptions {
  variant?: SweetAlertIcon;
  showCancelButton?: boolean;
  confirmCallback?: (result?: SweetAlertResult) => void;
}

export const sweetAlert = ({
  variant = 'warning',
  showCancelButton = true,
  confirmCallback,
  confirmButtonText = 'Eliminar',
  ...props
}: Props) => {
  MySwal.fire({
    icon: variant,
    color: 'var(--text_color)',
    background: colors.sweet_alert_background,

    confirmButtonText: confirmButtonText,
    confirmButtonColor: colors.error,

    showCancelButton,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: colors.tertiary,

    ...props
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback && confirmCallback(result);
    }
  });
};
