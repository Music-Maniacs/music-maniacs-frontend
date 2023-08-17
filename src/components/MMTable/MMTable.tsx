import React, { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow } from '@mui/material';
import './MMTable.scss';

interface CellProps extends TableCellProps {
  children: string | React.ReactNode;
}

type ColumnDefinitionType<T> = {
  header: string;
  renderCell: (rowData: T) => ReactNode | string;
  cellProps?: TableCellProps;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnDefinitionType<T>[];
};

const StyledMaterialUiCell = ({ children, ...props }: CellProps) => {
  return (
    <TableCell className="table-cell" {...props}>
      {children}
    </TableCell>
  );
};

export function MMTable<T>({ data, columns }: TableProps<T>) {
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
          {data.map((row, index1) => (
            <TableRow key={'row-' + index1}>
              {columns.map((column, index2) => (
                <StyledMaterialUiCell key={`cell-${index1}-${index2}`} {...column.cellProps}>
                  {column.renderCell(row)}
                </StyledMaterialUiCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
