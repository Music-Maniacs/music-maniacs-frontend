import { TablePagination } from '@mui/material';
import React from 'react';

// --> WIP (No esta terminado)
const MMTablePaginator = () => {
  return (
    <div>
      <TablePagination
        sx={{ color: 'white' }}
        component="div"
        count={100}
        page={1}
        onPageChange={() => console.log('onPageChange')}
        rowsPerPage={10}
        onRowsPerPageChange={() => console.log('onRowsPerPageChange')}
      />
    </div>
  );
};

export default MMTablePaginator;
