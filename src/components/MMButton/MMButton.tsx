import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface Props extends ButtonProps {
  content: string;
}

export const MMButton = (props: Props) => {
  return (
    <Button variant={props.variant ?? 'contained'} size={props.size ?? 'small'} {...props}>
      {props.content}
    </Button>
  );
};
