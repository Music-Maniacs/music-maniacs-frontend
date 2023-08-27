import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteRole } from '../../../../services/roleService';

export const useRoleRequests = () => {
  const handleDeleteRole = (roleId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el rol?',
      confirmCallback: async () => {
        try {
          await adminDeleteRole(roleId);

          infoSnackbar('Usuario eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          errorSnackbar('Error al eliminar el usuario');
        }
      }
    });
  };

  return { handleDeleteRole };
};
