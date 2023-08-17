import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import colors from '../../styles/_colors.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode | string;
  children: React.ReactNode;
};

export const MMModal = ({ isOpen, onClose, title, children }: Props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: colors.sweet_alert_background,
          color: 'white'
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
