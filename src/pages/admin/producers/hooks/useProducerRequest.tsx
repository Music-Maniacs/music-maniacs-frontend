import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteProducer } from '../../../../services/producerService';
import { handleApiErrors } from '../../../../utils/handleFormErrors';
import { isAxiosError } from 'axios';

export const useProducerRequests = () => {
  const handleDeleteProducer = (producerId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar la productora?',
      confirmCallback: async () => {
        try {
          await adminDeleteProducer(producerId);

          infoSnackbar('Productora eliminada correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          let hasFormError = handleApiErrors(error);

          !hasFormError && errorSnackbar('Error inesperado al eliminar la productora. Contacte a soporte.');
        }
      }
    });
  };

  return { handleDeleteProducer };
};
