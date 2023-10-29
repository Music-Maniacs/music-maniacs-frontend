import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteArtist } from '../../../../services/artistService';
import { handleApiErrors } from '../../../../utils/handleFormErrors';

export const useArtistsRequests = () => {
  const handleDeleteArtist = (artistId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar al artista?',
      confirmCallback: async () => {
        try {
          await adminDeleteArtist(artistId);

          infoSnackbar('Artista eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          let hasFormError = handleApiErrors(error);

          !hasFormError && errorSnackbar('Error inesperado al eliminar el artista. Contacte a soporte.');
        }
      }
    });
  };

  return { handleDeleteArtist };
};
