import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { useThresholdRequests } from '../hooks/useThresholdRequests';
import { Threshold } from '../../../../models/Threshold';
import { useThreshold } from '../context/ThresholdProvider';

export const Table = () => {
  const { thresholds, isLoading, openModal, setThreshold } = useThreshold();
  const { handleDeleteThreshold } = useThresholdRequests();

  const handleDeleteButton = (threshold: Threshold) => {
    handleDeleteThreshold(threshold, () => {});
  };

  return (
    <MMTable<Threshold>
      data={thresholds}
      isLoading={isLoading}
      columns={[
        {
          header: 'Cantidad Penalizaciones',
          renderCell: (rowData) => {
            return rowData.penalty_score;
          }
        },
        {
          header: 'Dias Bloqueados',
          renderCell: (rowData) => {
            return rowData.permanent_block ? 'Permanente' : rowData.days_blocked;
          }
        },
        {
          header: 'Acciones',
          renderCell: (rowData) => {
            return (
              <Stack direction={'row'} spacing={1}>
                <MMButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Editar"
                  onClick={() => {
                    setThreshold(rowData);
                    openModal();
                  }}
                >
                  <FaEdit />
                </MMButton>
                <MMButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Eliminar"
                  onClick={() => handleDeleteButton(rowData)}
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
