import React from 'react';
import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { warningSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { TrustLevel } from '../../../../models/TrustLevel';
import { useTrustLevels } from '../context/trustLevelContext';
import { MMColors } from '../../../../models/Generic';
import colors from '../../../../styles/_colors.scss';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaLock, FaSearch, FaTrash, FaTrashRestore, FaUnlock } from 'react-icons/fa';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { useNavigate } from 'react-router-dom';
import { useTrustLevelRequests } from '../hooks/useTrustLevelRequest';

export const Table = () => {
  const navigate = useNavigate();
  const { trustLevels, pagination, setTrustLevels } = useTrustLevels();
  const { handleDeleteTrustLevel } = useTrustLevelRequests();

  const handleShowButton = (trustLevelId: string) => {
    navigate(`/admin/trust_levels/${trustLevelId}`);
  };

  const handleDeleteButton = (trustLevelId: string) => {
    handleDeleteTrustLevel(trustLevelId, () => {
      const trustLevel = trustLevels?.find((trustLevel) => trustLevel.id === trustLevelId);
      if (!trustLevel) return;

      setTrustLevels((trustLevels) => {
        const newTrustLevels = [...(trustLevels ? trustLevels : [])];
        const index = newTrustLevels.findIndex((trustLevel) => trustLevel.id === trustLevelId);

        if (index === -1) return trustLevels;

        newTrustLevels[index] = trustLevel;

        return newTrustLevels;
      });
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
                  onClick={() => handleDeleteButton(rowData.id)}
                >
                  <FaTrash />
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
  );
};
