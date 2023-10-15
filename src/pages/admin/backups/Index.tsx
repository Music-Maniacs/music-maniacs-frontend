import React, { useEffect, useState } from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import '../Admin.scss';
import { Tooltip } from 'react-tooltip';
import { Backup } from '../../../models/Backup';
import { MMTable } from '../../../components/MMTable/MMTable';
import { formatDate } from '../../../utils/formatDate';
import { StyledFlex } from '../../../styles/styledComponents';
import { MMButton } from '../../../components/MMButton/MMButton';
import { FaBackward, FaTrash } from 'react-icons/fa';
import { errorSnackbar, infoSnackbar } from '../../../components/Snackbar/Snackbar';
import { deleteBackup, getBackups as serviceGetBackups } from '../../../services/backupService';
import { sweetAlert } from '../../../components/SweetAlert/sweetAlert';

const Index = () => {
  const [backups, setBackups] = useState<Backup[]>([]);

  useEffect(() => {
    getBackups();
  }, []);

  const getBackups = async () => {
    try {
      const response = await serviceGetBackups();

      setBackups(response);
    } catch (error) {
      errorSnackbar('Error al obtener los backups. Contacte a soporte.');
    }
  };

  const handleRestoreButton = (backup: Backup) => {
    sweetAlert({
      title: '¿Seguro que quieres restaurar la copia de seguridad?',
      confirmCallback: async () => {
        try {
          await deleteBackup(backup.name);

          infoSnackbar('Copia de seguridad restaurada correctamente');
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Error al restaurar la copia de seguridad';

          errorSnackbar(errorMessage);
        }
      }
    });
  };

  const handleDeleteButton = (backup: Backup) => {
    sweetAlert({
      title: '¿Seguro que quieres eliminar la copia de seguridad?',
      confirmCallback: async () => {
        try {
          await deleteBackup(backup.name);

          infoSnackbar('Copia de seguridad eliminado correctamente');

          setBackups(backups.filter((b) => b.name !== backup.name));
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Error al eliminar la copia de seguridad';

          errorSnackbar(errorMessage);
        }
      }
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Copias de Seguridad" />
        </div>
        <MMTable<Backup>
          data={backups}
          columns={[
            { header: 'Nombre', renderCell: (rowData) => <span>{rowData.name}</span> },
            {
              header: 'Fecha de Creación',
              renderCell: (rowData) => <span>{formatDate({ date: rowData.date, format: 'slashWithTime' })}</span>
            },
            {
              header: 'Tamaño [MB]',
              renderCell: (rowData) => <span>{rowData.size_megabytes}</span>
            },
            {
              header: 'Acciones',
              renderCell: (rowData) => (
                <StyledFlex>
                  <MMButton
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Restaurar"
                    onClick={() => handleRestoreButton(rowData)}
                  >
                    <FaBackward />
                  </MMButton>

                  <MMButton
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Eliminar"
                    onClick={() => handleDeleteButton(rowData)}
                  >
                    <FaTrash />
                  </MMButton>
                </StyledFlex>
              )
            }
          ]}
        />
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};

export default Index;
