import React from 'react';

import { Button } from '../Button';
import { ButtonProps } from '@mui/material';

type Props = {
  buttonText?: string,
  children?: React.ReactNode,
};

export const ContainedButton: React.FC<Props & ButtonProps> = ({
  buttonText='button text',
  children,
  ...restProps
}) => {
  const buttonContent = children || buttonText;

  return (
    <Button
      variant="contained"
      {...restProps}
    >
      { buttonContent }
    </Button>
  );
};
