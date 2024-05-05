import React from 'react';

import {
  Box,
  Button,
  styled,
} from '@mui/material';

const StyledBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  marginTop: '100px',
});

export const AppContent: React.FC = () => (
  <StyledBox>
    <Button
      variant="contained"
    >
      Ворота стоянки, возле дороги
    </Button>
    <Button
      variant="contained"
    >
      Ворота стоянки, дальние
    </Button>
    <Button
      variant="contained"
    >
      Ворота здания
    </Button>
    <Button
      variant="contained"
    >
      Дверь здания
    </Button>
    <Button
      variant="contained"
    >
      Дверь стоянки
    </Button>
  </StyledBox>
);
