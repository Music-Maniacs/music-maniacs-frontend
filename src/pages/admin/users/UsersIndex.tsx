import React, { useState } from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../components/MMButton/MMButton';
import { FaLock, FaSearch, FaSearchPlus, FaTrash, FaTrashRestore, FaUnlock } from 'react-icons/fa';
import { User } from '../../../models/User';
import '../Admin.scss';
import { MMTable } from '../../../components/MMTable/MMTable';
import { Stack } from '@mui/material';
import { Tooltip } from 'react-tooltip';
import colors from '../../../styles/_colors.scss';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { sweetAlert } from '../../../components/SweetAlert/sweetAlert';
import { successSnackbar } from '../../../components/Snackbar/Snackbar';
import { MMModal } from '../../../components/Modal/MMModal';

// fixme: mockdata
const userMockData: User[] = [
  {
    id: '123',
    full_name: 'JOkin Abarzua',
    username: 'juan16',
    email: 'email@gmail.com',
    password: '123456',
    rol: 'admin',
    state: 'blocked'
  },
  {
    id: '42524352',
    full_name: 'Octa Alcalde',
    username: 'ocatvio1',
    email: 'asfads@gmail.com',
    password: '123456',
    rol: 'moderador',
    state: 'active'
  },
  {
    id: '42524352',
    full_name: 'Lucas Miranda',
    username: 'lucas',
    email: 'lucas@gmail.com',
    password: '123456',
    rol: 'Admin',
    state: 'deleted'
  },
  {
    id: '42524352',
    full_name: 'Eze Salas',
    username: 'eze1',
    email: 'eze@gmail.com',
    password: '123456',
    rol: 'Moderador',
    state: 'active'
  },
  {
    id: '42524352',
    full_name: 'Tomi Espinosa',
    username: 'tomi1',
    email: 'tomas@gmail.com',
    password: '567',
    rol: 'Moderador',
    state: 'active'
  }
];

type Dictionary = {
  [key: string]: string;
};

const stateColors: Dictionary = {
  active: colors.success,
  blocked: colors.primary,
  deleted: colors.error
};

const stateNames: Dictionary = {
  active: 'Activo',
  blocked: 'Bloqueado',
  deleted: 'Eliminado'
};

const UsersIndex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getStateColor(state: string): string {
    return stateColors[state] || colors.primary;
  }

  function getStateNames(state: string): string {
    return stateNames[state] || colors.primary;
  }

  const handleShowButton = (userId: string) => {
    console.log('navigate /users/index');
  };

  const handleDeleteButton = () => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar el usuario?',
      confirmCallback: () => successSnackbar('Usuario eliminado con éxito')
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
      confirmCallback: () => successSnackbar('Usuario bloqueado con éxito')
    });
  };

  const handleRestoreButton = () => {
    sweetAlert({
      title: '¿Seguro que quieres resturar el usuario?',
      confirmCallback: () => successSnackbar('Usuario restaurado con éxito')
    });
  };

  const handleUnlockButton = () => {
    sweetAlert({
      title: '¿Seguro que quieres desbloquear el usuario?',
      confirmCallback: () => successSnackbar('Usuario desbloqueado con éxito')
    });
  };

  return (
    <>
      <MMContainer maxWidth="xxl">
        <MMBox className="admin-box-container">
          <div className="admin-title-container">
            <MMTitle content="Usuarios" />
            <MMButton onClick={() => setIsModalOpen(true)}>Crear Usuario</MMButton>
          </div>

          <MMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Usuario">
            <MMButton color="tertiary" onClick={() => setIsModalOpen(false)}>
              Cerrar
            </MMButton>
          </MMModal>

          <div className="admin-search-container">
            Buscador
            <MMButton>
              <FaSearchPlus />
              Buscar
            </MMButton>
          </div>

          <MMTable<User>
            data={userMockData}
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
                  return (
                    <span
                      style={{
                        color: 'white',
                        backgroundColor: getStateColor(rowData.state),
                        borderRadius: '20px',
                        padding: '3px 6px'
                      }}
                    >
                      {getStateNames(rowData.state)}
                    </span>
                  );
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
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Eliminar"
                        onClick={() => handleDeleteButton()}
                      >
                        <FaTrash />
                      </MMButton>
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Bloquear"
                        onClick={() => handleLockButton()}
                      >
                        <FaLock />
                      </MMButton>
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Desbloquear"
                        onClick={() => handleUnlockButton()}
                      >
                        <FaUnlock />
                      </MMButton>
                      <MMButton
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Restaurar"
                        onClick={() => handleRestoreButton()}
                      >
                        <FaTrashRestore />
                      </MMButton>
                    </Stack>
                  );
                },
                cellProps: {
                  width: '1%'
                }
              }
            ]}
          />
          <MMTablePaginator />
        </MMBox>
        <Tooltip id="tooltip" place="top" />
      </MMContainer>
    </>
  );
};

export default UsersIndex;
