import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { User, stateColors, stateNames } from '../../../../models/User';
import { useUsers } from '../context/usersContext';
import { MMColors } from '../../../../models/Generic';
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
  const { handleDeleteUser, handleRestoreUser, handleUnblockUser, handleBlockUser } = useUserRequests();

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
      const user = users?.find((user) => user.id === userId);
      if (!user) return;

      user.deleted_at = new Date().toISOString();
      user.state = 'deleted';

      setUsers((users) => {
        const newUsers = [...(users ? users : [])];
        const index = newUsers.findIndex((user) => user.id === userId);

        if (index === -1) return users;

        newUsers[index] = user;

        return newUsers;
      });
    });
  };

  const handleRestoreButton = (userId: string) => {
    handleRestoreUser(userId, () => {
      const user = users?.find((user) => user.id === userId);
      if (!user) return;

      user.deleted_at = undefined;
      user.state = user.blocked_until ? 'blocked' : 'active';

      setUsers((users) => {
        const newUsers = [...(users ? users : [])];
        const index = newUsers.findIndex((user) => user.id === userId);

        if (index === -1) return users;

        newUsers[index] = user;

        return newUsers;
      });
    });
  };

  const handleLockButton = (userId: string) => {
    handleBlockUser(userId, () => {
      const user = users?.find((user) => user.id === userId);
      if (!user) return;

      user.blocked_until = new Date().toISOString();
      user.state = 'blocked';

      setUsers((users) => {
        const newUsers = [...(users ? users : [])];
        const index = newUsers.findIndex((user) => user.id === userId);

        if (index === -1) return users;

        newUsers[index] = user;

        return newUsers;
      });
    });
  };

  const handleUnlockButton = (userId: string) => {
    handleUnblockUser(userId, () => {
      const user = users?.find((user) => user.id === userId);
      if (!user) return;

      user.blocked_until = undefined;
      user.state = user.deleted_at ? 'deleted' : 'active';

      setUsers((users) => {
        const newUsers = [...(users ? users : [])];
        const index = newUsers.findIndex((user) => user.id === userId);

        if (index === -1) return users;

        newUsers[index] = user;

        return newUsers;
      });
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
            return rowData.role?.name;
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
                    onClick={() => handleRestoreButton(rowData.id)}
                  >
                    <FaTrashRestore />
                  </MMButton>
                ) : (
                  <>
                    {rowData.blocked_until ? (
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Desbloquear"
                        onClick={() => handleUnlockButton(rowData.id)}
                      >
                        <FaUnlock />
                      </MMButton>
                    ) : (
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Bloquear"
                        onClick={() => handleLockButton(rowData.id)}
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
