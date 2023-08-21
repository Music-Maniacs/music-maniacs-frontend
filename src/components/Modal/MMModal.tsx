import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import colors from '../../styles/_colors.scss';

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  title?: React.ReactNode | string;
  children: React.ReactNode;
};

export const MMModal = ({ isModalOpen, closeModal, title, children }: Props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={isModalOpen}
      onClose={closeModal}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: colors.sweet_alert_background,
          color: 'white'
        }
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
