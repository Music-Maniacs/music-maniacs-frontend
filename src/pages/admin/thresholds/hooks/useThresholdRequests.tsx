import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Threshold } from '../../../../models/Threshold';
import { destroyThreshold } from '../../../../services/thresholdService';
import { isAxiosError } from 'axios';

export const useThresholdRequests = () => {
  const handleDeleteThreshold = (threshold: Threshold, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el umbral?',
      confirmCallback: async () => {
        threshold.id &&
          destroyThreshold(threshold.id)
            .then(() => {
              infoSnackbar('Umbral eliminado correctamente');
              successCallback && successCallback();
            })
            .catch((error) => {
              if (isAxiosError(error) && error.response?.status === 403) {
                return errorSnackbar('No tienes permisos para realizar esta acción');
              }

              errorSnackbar('Error al eliminar el umbral');
            });
      }
    });
  };

  return { handleDeleteThreshold };
};
