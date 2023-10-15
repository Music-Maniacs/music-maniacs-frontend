import React from 'react';
import { Breakpoint, Dialog, DialogContent, DialogTitle } from '@mui/material';
import colors from '../../styles/_colors.scss';

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  title?: React.ReactNode | string;
  children: React.ReactNode;
  maxWidth?: Breakpoint;
};

export const MMModal = ({ isModalOpen, closeModal, title, maxWidth = 'sm', children }: Props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={isModalOpen}
      onClose={closeModal}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: colors.sweet_alert_background,
          color: colors.text_color
        }
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
