import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteVenue } from '../../../../services/venueService';
import { handleApiErrors } from '../../../../utils/handleFormErrors';
import { isAxiosError } from 'axios';

export const useVenuesRequests = () => {
  const handleDeleteVenue = (venueId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el espacio de eventos?',
      confirmCallback: async () => {
        try {
          await adminDeleteVenue(venueId);

          infoSnackbar('Espacio de Evento eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 403) {
            return errorSnackbar('No tienes permisos para realizar esta acción');
          }

          let hasFormError = handleApiErrors(error);

          !hasFormError && errorSnackbar('Error inesperado al eliminar el espacio de evento. Contacte a soporte.');
        }
      }
    });
  };

  return { handleDeleteVenue };
};
