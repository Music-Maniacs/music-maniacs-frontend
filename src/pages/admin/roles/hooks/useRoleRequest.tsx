import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteRole } from '../../../../services/roleService';
import { handleApiErrors } from '../../../../utils/handleFormErrors';

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
          let hasFormError = handleApiErrors(error);

          !hasFormError && errorSnackbar('Error al eliminar el Rol');
        }
      }
    });
  };

  return { handleDeleteRole };
};
