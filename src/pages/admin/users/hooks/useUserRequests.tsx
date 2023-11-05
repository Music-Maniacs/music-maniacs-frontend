import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminBlockUser, adminDeleteUser, adminRestoreUser, adminUnblockUser } from '../../../../services/userService';
import Swal from 'sweetalert2';
import { isAxiosError } from 'axios';

export const useUserRequests = () => {
  const handleDeleteUser = (userId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el usuario?',
      confirmCallback: async () => {
        try {
          await adminDeleteUser(userId);

          infoSnackbar('Usuario eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          errorSnackbar('Error al eliminar el usuario');
        }
      }
    });
  };

  const handleRestoreUser = (userId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres restaurar el usuario?',
      confirmButtonText: 'Restaurar',
      confirmCallback: async () => {
        try {
          await adminRestoreUser(userId);

          infoSnackbar('Usuario restaurado correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          errorSnackbar('Error al restaurar el usuario');
        }
      }
    });
  };

  const handleUnblockUser = (userId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres desbloquear el usuario?',
      confirmButtonText: 'Desbloquear',
      confirmCallback: async () => {
        try {
          await adminUnblockUser(userId);

          infoSnackbar('Usuario desbloqueado correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          errorSnackbar('Error al desbloquear el usuario');
        }
      }
    });
  };

  const handleBlockUser = (userId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres bloquear el usuario?',
      html: (
        <div
          style={{
            display: 'flex',
            width: 'fit-content',
            flexDirection: 'column',
            margin: 'auto',
            alignItems: 'flex-end',
            gap: ' 5px'
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <span>Bloquear Usuario Hasta:</span> <input id="blockedUntil" type="date" />
          </div>
          <div>
            <input id="permanentCheckbox" type="checkbox" />
            <span>Permanente</span>
          </div>
        </div>
      ),
      confirmButtonText: 'Bloquear',
      preConfirm: () => {
        const dateInput = Swal.getPopup()?.querySelector('#blockedUntil') as HTMLInputElement;
        const permanentInput = Swal.getPopup()?.querySelector('#permanentCheckbox') as HTMLInputElement;

        const dateValue = dateInput.value;
        const permanentValue = permanentInput.checked;

        if (!permanentValue && !dateValue) {
          Swal.showValidationMessage('Debe seleccionar una opción');
        }

        if (!permanentValue && new Date(dateValue) < new Date()) {
          Swal.showValidationMessage('La fecha debe ser mayor a la actual');
        }

        return { blockedUntil: permanentValue ? 'permanent' : dateValue.toString() };
      },
      confirmCallback: async (result) => {
        if (!result?.value?.blockedUntil) return errorSnackbar('Debes seleccionar una opción');

        try {
          await adminBlockUser(userId, result.value.blockedUntil);

          infoSnackbar('Usuario bloqueado correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          errorSnackbar('Error al bloquear el usuario');
        }
      }
    });
  };

  return { handleDeleteUser, handleRestoreUser, handleUnblockUser, handleBlockUser };
};
