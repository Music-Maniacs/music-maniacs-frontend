import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { TrustLevel } from '../../../../models/TrustLevel';
import { useTrustLevels } from '../context/trustLevelContext';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTrustLevelRequests } from '../hooks/useTrustLevelRequest';

export const Table = () => {
  const navigate = useNavigate();
  const { trustLevels, pagination, setTrustLevels, policies } = useTrustLevels();
  const { handleDeleteTrustLevel } = useTrustLevelRequests();

  const handleShowButton = (trustLevelId: string) => {
    navigate(`/admin/trust_levels/${trustLevelId}`);
  };

  const handleDeleteButton = (trustLevelId: string) => {
    handleDeleteTrustLevel(trustLevelId, () => {
      setTrustLevels((prevState) => prevState?.filter((trustLevel) => trustLevel.id !== trustLevelId));
    });
  };

  return (
    <MMTable<TrustLevel>
      data={trustLevels}
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
