import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import {
  Report,
  ReportStatus,
  reportCategoriesTranslated,
  reportableTypeTranslated,
  statusColors,
  statusNames
} from '../../../../models/Report';
import { useReports } from '../../context/moderationContext';
import { Stack } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { formatDate } from '../../../../utils/formatDate';
import { MMColors } from '../../../../models/Generic';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { MMButtonLink } from '../../../../components/MMButton/MMButtonLink';

export const Table = () => {
  const { reports, pagination, policies } = useReports();

  function getStatusColor(status: ReportStatus): MMColors {
    return statusColors[status];
  }

  function getStatusName(status: ReportStatus): string {
    return statusNames[status];
  }

  return (
    <MMTable<Report>
      data={reports}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Contenido Reportado',
          renderCell: (rowData) => {
            return reportableTypeTranslated[rowData.reportable_type];
          }
        },
        {
          header: 'Categoría',
          renderCell: (rowData) => {
            return reportCategoriesTranslated[rowData.category];
          }
        },
        {
          header: 'Creado Por',
          renderCell: (rowData) => {
            return rowData.reporter?.full_name;
          }
        },
        {
          header: 'Creado El',
          renderCell: (rowData) => {
            return formatDate({ date: rowData.created_at, format: 'slashWithTime' });
          }
        },
        {
          header: 'Resuelto Por',
          renderCell: (rowData) => {
            return rowData.resolver?.full_name;
          }
        },
        {
          header: 'Estado',
          renderCell: (rowData) => {
            return <MMChip color={getStatusColor(rowData.status)}>{getStatusName(rowData.status)}</MMChip>;
          }
        },
        {
          header: 'Acciones',
          renderCell: (rowData) => {
            return (
              <Stack direction={'row'} spacing={1}>
                {policies?.show && (
                  <MMButtonLink data-tooltip-id="tooltip" data-tooltip-content="Ver" to={`/moderation/${rowData.id}`}>
                    <FaSearch />
                  </MMButtonLink>
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
