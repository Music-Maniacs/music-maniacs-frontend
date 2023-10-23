import React from 'react';
import { Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow } from '@mui/material';

interface CellProps extends TableCellProps {
  children: string | React.ReactNode;
  isHeader?: boolean;
}

type DynamicRow = {
  cellProps?: TableCellProps;
  content: SimpleRow;
};

type SimpleRow = string | number;

export type DashboardTableRow = Array<DynamicRow | SimpleRow>;

export type DashboardTableProps = {
  rows: DashboardTableRow[];
  headers: string[];
};

const StyledMaterialUiCell = ({ children, isHeader = false, ...props }: CellProps) => {
  return (
    <TableCell {...props} className={`${isHeader ? 'dashboard-table--header' : ''} dashboard-table--cell`}>
      {children}
    </TableCell>
  );
};

export function DashboardTable({ rows, headers }: DashboardTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledMaterialUiCell key={`header-${index}`} isHeader>
                {header}
              </StyledMaterialUiCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index1) => (
            <TableRow key={'row-' + index1}>
              {row.map((item, index2) => (
                // @ts-ignore
                <StyledMaterialUiCell key={`cell-${index1}-${index2}`} {...item?.cellProps}>
                  {/* @ts-ignore */}
                  {item.content ? item.content : item}
                </StyledMaterialUiCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
