import React from 'react';
import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminDeleteUser } from '../../../../services/userService';

export const useUserRequests = () => {
  const handleDeleteUser = (userId: string, successCallback?: () => void) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el usuario?',
      confirmCallback: async () => {
        try {
          await adminDeleteUser(userId);

          infoSnackbar('Usuario eliminado correctamente');

          successCallback && successCallback();
        } catch (error) {
          errorSnackbar('Error al eliminar el usuario');
        }
      }
    });
  };

  return { handleDeleteUser };
};
