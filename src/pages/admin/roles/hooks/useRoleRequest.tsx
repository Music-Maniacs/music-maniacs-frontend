import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteRole } from '../../../../services/roleService';
import { isAxiosError } from 'axios';

export const useRoleRequests = () => {
  const handleDeleteRole = (roleId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el rol?',
      confirmCallback: async () => {
        try {
          await adminDeleteRole(roleId);

          infoSnackbar('Rol eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          errorSnackbar('Error al eliminar el Rol');
        }
      }
    });
  };

  return { handleDeleteRole };
};
