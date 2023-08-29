import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { useThreshold } from '../context/ThresholdProvider';
import { Threshold } from '../../../../models/Threshold';

export const useThresholdRequests = () => {
  const { thresholds, dispatch } = useThreshold();
  
  const handleDeleteThreshold = (threshold: Threshold, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el umbral?',
      confirmCallback: async () => {
        try {
          dispatch({type:"remove_threshold",payload:threshold}); // No se si se verifica que se haya eliminado
          if (thresholds?.includes(threshold)){
            infoSnackbar('Umbral eliminado correctamente');
            successCallback && successCallback();
          }
        } catch (error) {
          errorSnackbar('Error al eliminar el umbral');
        }
      }
    });
  };

  return { handleDeleteThreshold };
};
