import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteEvent } from '../../../../services/eventService';

export const useEventsRequests = () => {
  const handleDeleteEvent = (eventId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el evento?',
      confirmCallback: async () => {
        try {
          await adminDeleteEvent(eventId);

          infoSnackbar('Evento eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          errorSnackbar('Error al eliminar el Evento');
        }
      }
    });
  };

  return { handleDeleteEvent };
};
