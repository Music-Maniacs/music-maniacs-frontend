import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useProducers } from '../context/producerContext';
import { Producer } from '../../../../models/Producer';
import { Stack } from '@mui/material';
import { useProducerRequests } from '../hooks/useProducerRequest';
import './Table.scss';
import { MMChip } from '../../../../components/MMChip/MMChip';

export const Table = () => {
  const navigate = useNavigate();
  const { producers, pagination, setProducers, openFormModal, setIsFormEdit, setProducerToEdit } = useProducers();
  const { handleDeleteProducer } = useProducerRequests();

  const handleShowButton = (producerId: string) => {
    navigate(`/admin/producers/${producerId}`);
  };

  const handleEditButton = (producer: Producer) => {
    setIsFormEdit(true);
    setProducerToEdit(producer);
    openFormModal();
  };

  const handleDeleteButton = (producerId: string) => {
    handleDeleteProducer(producerId, () => {
      setProducers((prevState) => {
        if (prevState) {
          const newState = [...prevState];
          const producerIndex = newState.findIndex((producer) => producer.id === producerId);

          if (producerIndex === -1) return prevState;

          newState[producerIndex].deleted_at = new Date().toString();
          return newState;
        }
      });
    });
  };

  return (
    <MMTable<Producer>
      data={producers}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Nombre',
          renderCell: (rowData) => {
            return rowData.name;
          }
        },
        {
          header: 'Descripción',
          renderCell: (rowData) => {
            return <div className="dato">{rowData.description}</div>;
          }
        },
        {
          header: '',
          renderCell: (rowData) => {
            return rowData.deleted_at && <MMChip color="error">Eliminado</MMChip>;
          },
          cellProps: {
            width: '1%'
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
                  data-tooltip-content="Editar"
                  onClick={() => handleEditButton(rowData)}
                >
                  <FaEdit />
                </MMButton>

                {!rowData.deleted_at && (
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
