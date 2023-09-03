import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteTrustLevel } from '../../../../services/trustLevelService';

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
          errorSnackbar('Error al eliminar el nivel de confianza');
        }
      }
    });
  };

  return { handleDeleteTrustLevel };
};
