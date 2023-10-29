import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteVenue } from '../../../../services/venueService';
import { handleApiErrors } from '../../../../utils/handleFormErrors';

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
          let hasFormError = handleApiErrors(error);

          !hasFormError && errorSnackbar('Error inesperado al eliminar el espacio de evento. Contacte a soporte.');
        }
      }
    });
  };

  return { handleDeleteVenue };
};
