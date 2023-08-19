import React from 'react';
import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { warningSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { User, stateColors, stateNames } from '../../../../models/User';
import { useUsers } from '../context/userContext';
import { Dictionary, MMColors } from '../../../../models/Generic';
import colors from '../../../../styles/_colors.scss';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaLock, FaSearch, FaTrash, FaTrashRestore, FaUnlock } from 'react-icons/fa';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { useNavigate } from 'react-router-dom';
import { useUserRequests } from '../hooks/useUserRequests';

export const Table = () => {
  const navigate = useNavigate();
  const { users, pagination, setUsers } = useUsers();
  const { handleDeleteUser } = useUserRequests();

  function getStateColor(state: string): MMColors {
    return stateColors[state] || (colors.primary as MMColors);
  }

  function getStateName(state: string): string {
    return stateNames[state] || '';
  }

  const handleShowButton = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleDeleteButton = (userId: string) => {
    handleDeleteUser(userId, () => {
      setUsers((prevState) => prevState?.filter((user) => user.id !== userId));
    });
  };

  const handleLockButton = () => {
    sweetAlert({
      title: '¿Seguro que quieres bloquear el usuario?',
      html: (
        <div
          style={{
            display: 'flex',
            width: 'fit-content',
            flexDirection: 'column',
            margin: 'auto',
            alignItems: 'flex-end',
            gap: ' 5px'
          }}
        >
          <div>
            <span>Bloquear Usuario Hasta: </span> <input type="date" />
          </div>
          <div>
            <input type="checkbox" />
            <span>Permanente</span>
          </div>
        </div>
      ),
      confirmCallback: () => warningSnackbar('FUNCIONALIDAD EN PROCESO')
    });
  };

  const handleRestoreButton = () => {
    sweetAlert({
      title: '¿Seguro que quieres resturar el usuario?',
      confirmCallback: () => warningSnackbar('FUNCIONALIDAD EN PROCESO')
    });
  };

  const handleUnlockButton = () => {
    sweetAlert({
      title: '¿Seguro que quieres desbloquear el usuario?',
      confirmCallback: () => warningSnackbar('FUNCIONALIDAD EN PROCESO')
    });
  };

  return (
    <MMTable<User>
      data={users}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Nombre',
          renderCell: (rowData) => {
            return rowData.full_name;
          }
        },
        {
          header: 'Usuario',
          renderCell: (rowData) => {
            return rowData.username;
          }
        },
        {
          header: 'Email',
          renderCell: (rowData) => {
            return rowData.email;
          }
        },
        {
          header: 'Estado',
          renderCell: (rowData) => {
            return <MMChip color={getStateColor(rowData.state)}>{getStateName(rowData.state)}</MMChip>;
          },
          cellProps: {
            align: 'center'
          }
        },
        {
          header: 'Rol',
          renderCell: (rowData) => {
            return rowData.rol;
          },
          cellProps: {
            align: 'center'
          }
        },
        {
          header: 'Acciones',
          renderCell: (rowData) => {
            return (
              <Stack direction={'row'} spacing={1}>
                <MMButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Ver"
                  onClick={() => handleShowButton(rowData.id)}
                >
                  <FaSearch />
                </MMButton>

                {rowData.deleted_at ? (
                  <MMButton
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Restaurar"
                    onClick={() => handleRestoreButton()}
                  >
                    <FaTrashRestore />
                  </MMButton>
                ) : (
                  <>
                    {rowData.blocked_until ? (
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Desbloquear"
                        onClick={() => handleUnlockButton()}
                      >
                        <FaUnlock />
                      </MMButton>
                    ) : (
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Bloquear"
                        onClick={() => handleLockButton()}
                      >
                        <FaLock />
                      </MMButton>
                    )}
                    <MMButton
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Eliminar"
                      onClick={() => handleDeleteButton(rowData.id)}
                    >
                      <FaTrash />
                    </MMButton>
                  </>
                )}
              </Stack>
            );
          },
          cellProps: {
            width: '1%'
          }
        }
      ]}
    />
  );
};
