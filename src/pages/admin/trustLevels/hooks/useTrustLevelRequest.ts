import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteTrustLevel } from '../../../../services/trustLevelService';
import { isAxiosError } from 'axios';
import { handleApiErrors } from '../../../../utils/handleFormErrors';

export const useTrustLevelRequests = () => {
  const handleDeleteTrustLevel = (trustLevelId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el nivel de confianza?',
      confirmCallback: async () => {
        try {
          await adminDeleteTrustLevel(trustLevelId);

          infoSnackbar('Nivel de confianza eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          let hasFormError = handleApiErrors(error);

          !hasFormError && errorSnackbar('Error al eliminar el nivel de confianza');
        }
      }
    });
  };

  return { handleDeleteTrustLevel };
};
