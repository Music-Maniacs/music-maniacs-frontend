import React, { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { UserInfo } from './UserInfo';
import { Form } from './Form';
import { User, stateColors, stateNames } from '../../../../models/User';
import { useModal } from '../../../../components/hooks/useModal';
import { errorSnackbar, warningSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminGetUser } from '../../../../services/userService';
import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { MMModal } from '../../../../components/Modal/MMModal';
import { Loader } from '../../../../components/Loader/Loader';
import '../../Admin.scss';
import { useUserRequests } from '../hooks/useUserRequests';
import colors from '../../../../styles/_colors.scss';
import { MMColors } from '../../../../models/Generic';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { MMButtonResponsive } from '../../../../components/MMButton/MMButtonResponsive';
import { FaArrowLeft, FaEdit, FaLock, FaTrash, FaTrashRestore, FaUnlock } from 'react-icons/fa';
import './Show.scss';

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeleteUser, handleRestoreUser, handleBlockUser, handleUnblockUser } = useUserRequests();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getStateColor(state: string): MMColors {
    return stateColors[state] || (colors.primary as MMColors);
  }

  function getStateName(state: string): string {
    return stateNames[state] || '';
  }

  const getUser = async () => {
    if (!id) return;

    try {
      const user = await adminGetUser(id);

      setUser(user);
    } catch (error) {
      errorSnackbar('Error al obtener el usuario. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = () => {
    if (!user) return;

    handleDeleteUser(user.id, () => {
      setUser({ ...user, state: 'deleted', deleted_at: new Date().toISOString() });
    });
  };

  const handleLockButton = () => {
    if (!user) return;

    handleBlockUser(user.id, () => {
      setUser({ ...user, state: 'blocked', blocked_until: new Date().toISOString() });
    });
  };

  const handleUnlockButton = () => {
    if (!user) return;

    handleUnblockUser(user.id, () => {
      setUser({ ...user, state: user.deleted_at ? 'deleted' : 'active', blocked_until: undefined });
    });
  };

  const handleRestoreButton = () => {
    if (!user) return;

    handleRestoreUser(user.id, () => {
      setUser({ ...user, state: user.blocked_until ? 'blocked' : 'active', deleted_at: undefined });
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <div className="users-show-title-container">
            <div className="title-chip">
              <MMTitle content="Usuario" />
              {user && <MMChip color={getStateColor(user.state)}>{getStateName(user.state)}</MMChip>}
            </div>

            <Stack direction={'row'} spacing={1} justifyContent={'flex-end'} width={'100%'}>
              <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
                Editar
              </MMButtonResponsive>

              {user?.deleted_at ? (
                <MMButtonResponsive color="error" onClick={() => handleRestoreButton()} Icon={FaTrashRestore}>
                  Restaurar
                </MMButtonResponsive>
              ) : (
                <>
                  {user?.blocked_until ? (
                    <MMButtonResponsive color="error" onClick={() => handleUnlockButton()} Icon={FaUnlock}>
                      Desbloquear
                    </MMButtonResponsive>
                  ) : (
                    <MMButtonResponsive color="error" onClick={() => handleLockButton()} Icon={FaLock}>
                      Bloquear
                    </MMButtonResponsive>
                  )}

                  <MMButtonResponsive color="error" onClick={() => handleDeleteButton()} Icon={FaTrash}>
                    Eliminar
                  </MMButtonResponsive>
                </>
              )}

              <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
                Volver
              </MMButtonResponsive>
            </Stack>
          </div>
        </div>

        {user ? (
          <>
            <MMModal title="Editar Usuario" isModalOpen={isModalOpen} closeModal={closeModal}>
              <Form user={user} closeFormModal={closeModal} setUser={setUser} />
            </MMModal>
            <UserInfo user={user} />
          </>
        ) : (
          <Loader />
        )}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
}
