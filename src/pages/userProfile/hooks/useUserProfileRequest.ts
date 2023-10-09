import { errorSnackbar, infoSnackbar } from '../../../components/Snackbar/Snackbar';
import { sweetAlert } from '../../../components/SweetAlert/sweetAlert';
import { deleteUserProfile } from '../../../services/userProfileService';

export const useUserProfileRequest = () => {
  const handleDeleteUserProfile = (successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar su cuenta?',
      confirmCallback: async () => {
        try {
          await deleteUserProfile();

          infoSnackbar('Cuenta eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          errorSnackbar('Error al eliminar la cuenta');
        }
      }
    });
  };
  return { handleDeleteUserProfile };
};
