import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteVenue } from '../../../../services/venueService';

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
          errorSnackbar('Error al eliminar el Espacio de Evento');
        }
      }
    });
  };

  return { handleDeleteVenue };
};
