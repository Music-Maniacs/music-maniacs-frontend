import { MMTable } from '../../../../components/MMTable/MMTable';
import { Role } from '../../../../models/Role';
import { useRoles } from '../context/roleContext';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRoleRequests } from '../hooks/useRoleRequest';
import { useCollection } from '../../../../context/collectionContext';

export const Table = () => {
  const navigate = useNavigate();
  const { roles, pagination, setRoles, policies } = useRoles();
  const { handleDeleteRole } = useRoleRequests();
  const { removeRoleInCollection } = useCollection();

  const handleShowButton = (roleId: string) => {
    navigate(`/admin/roles/${roleId}`);
  };

  const handleDeleteButton = (roleId: string) => {
    handleDeleteRole(roleId, () => {
      const role = roles?.find((role) => role.id === roleId);
      if (!role) return;

      setRoles(roles?.filter((item) => item.id !== role.id));
      removeRoleInCollection(roleId);
    });
  };

  return (
    <MMTable<Role>
      data={roles}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Nombre',
          renderCell: (rowData) => {
            return rowData.name;
          }
        },
        {
          header: 'Actualizado El',
          renderCell: (rowData) => {
            return rowData.updated_at;
          }
        },
        {
          header: 'Creado El',
          renderCell: (rowData) => {
            return rowData.created_at;
          }
        },
        {
          header: 'Acciones',
          renderCell: (rowData) => {
            return (
              <Stack direction={'row'} spacing={1}>
                {policies?.show && (
                  <MMButton
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Ver"
                    onClick={() => handleShowButton(rowData.id)}
                  >
                    <FaSearch />
                  </MMButton>
                )}

                {policies?.destroy && (
                  <MMButton
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Eliminar"
                    onClick={() => handleDeleteButton(rowData.id)}
                  >
                    <FaTrash />
                  </MMButton>
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
