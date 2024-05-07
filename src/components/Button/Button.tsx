import React from 'react';

import {
  Button as ButtonMUI,
  ButtonProps,
} from '@mui/material';

type Props = {
  buttonText?: string,
  children?: React.ReactNode,
};

export const Button: React.FC<Props & ButtonProps> = ({
  buttonText = 'text button',
  children,
  ...restProps
}) => {
  const buttonContent = children || buttonText;

  return (
    <ButtonMUI
      {...restProps}
    >
      { buttonContent }
    </ButtonMUI>
  );
};
