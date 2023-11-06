import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { deleteGenre } from '../../../../services/genreService';
import { handleApiErrors } from '../../../../utils/handleFormErrors';

export const useGenreRequests = () => {
  const handleDeleteGenre = (genreId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el género?',
      confirmCallback: async () => {
        try {
          await deleteGenre(genreId);

          infoSnackbar('Género eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          let hasFormError = handleApiErrors(error);

          !hasFormError && errorSnackbar('Error al eliminar el género');
        }
      }
    });
  };

  return { handleDeleteGenre };
};
