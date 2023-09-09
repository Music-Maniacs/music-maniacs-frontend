import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Threshold } from '../../../../models/Threshold';
import { destroyThreshold } from '../../../../services/thresholdService';

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
              errorSnackbar('Error al eliminar el umbral');
            });
      }
    });
  };

  return { handleDeleteThreshold };
};