import { enqueueSnackbar } from 'notistack';

export const defaultSnackbar = (message: string) => {
  enqueueSnackbar(message, { variant: 'default' });
};

export const successSnackbar = (message: string) => {
  enqueueSnackbar(message, { variant: 'success' });
};

export const errorSnackbar = (message: string) => {
  enqueueSnackbar(message, { variant: 'error' });
};

export const infoSnackbar = (message: string) => {
  enqueueSnackbar(message, { variant: 'info' });
};

export const warningSnackbar = (message: string) => {
  enqueueSnackbar(message, { variant: 'warning' });
};
