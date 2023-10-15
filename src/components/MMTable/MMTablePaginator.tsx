import React, { Dispatch, SetStateAction } from 'react';
import { TablePagination } from '@mui/material';
import { Pagination } from '../../models/Generic';

type Props = {
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
};

const MMTablePaginator = ({ pagination, setPagination }: Props) => {
  return (
    <div>
      <TablePagination
        component="div"
        count={pagination.total ?? 0}
        page={pagination.page - 1 ?? 0}
        onPageChange={(e, value: number) => {
          setPagination((prevState) => ({ ...prevState, page: value + 1, isLoading: true }));
        }}
        rowsPerPage={pagination.perPage}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setPagination((prevState) => ({
            ...prevState,
            page: 1,
            perPage: parseInt(event.target.value, 10),
            isLoading: true
          }));
        }}
      />
    </div>
  );
};

export default MMTablePaginator;
