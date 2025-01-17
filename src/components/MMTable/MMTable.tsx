import React, { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow } from '@mui/material';
import './MMTable.scss';
import { Loader } from '../Loader/Loader';
import { NoData } from '../NoData/NoData';

interface CellProps extends TableCellProps {
  children: string | React.ReactNode;
}

type ColumnDefinitionType<T> = {
  header: string;
  renderCell: (rowData: T) => ReactNode | string;
  cellProps?: TableCellProps;
};

type TableProps<T> = {
  data?: T[];
  columns: ColumnDefinitionType<T>[];
  isLoading?: boolean;
};

const StyledMaterialUiCell = ({ children, ...props }: CellProps) => {
  return (
    <TableCell className="table-cell" {...props}>
      {children}
    </TableCell>
  );
};

export function MMTable<T>({ data, columns, isLoading = false }: TableProps<T>) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledMaterialUiCell key={`header-${index}`} {...column.cellProps}>
                {column.header}
              </StyledMaterialUiCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledMaterialUiCell colSpan={12}>
                <Loader height={100} />
              </StyledMaterialUiCell>
            </TableRow>
          ) : !data || data.length === 0 ? (
            <TableRow>
              <StyledMaterialUiCell colSpan={12} style={{ borderBottom: 'none' }}>
                <NoData message="No hay datos para mostrar" />
              </StyledMaterialUiCell>
            </TableRow>
          ) : (
            data.map((row, index1) => (
              <TableRow key={'row-' + index1}>
                {columns.map((column, index2) => (
                  <StyledMaterialUiCell key={`cell-${index1}-${index2}`} {...column.cellProps}>
                    {column.renderCell(row)}
                  </StyledMaterialUiCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
