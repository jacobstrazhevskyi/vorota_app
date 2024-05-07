import React, { useEffect, useState } from 'react';

import {
  Box,
  CircularProgress,
  Typography,
  styled,
} from '@mui/material';

import { buttonsNames } from '../../aux/buttonsNames';
import { ContainedButton } from '../ContainedButton';

import { possiblePorts } from '../../aux/possiblePorts';

const StyledBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  marginTop: '100px',
});

export const AppContent: React.FC = () => {
  const [serverIp, setServerIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [possiblePortsArrayIndex, setPossiblePortsArrayIndex] = useState(0);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const responseIp = `http://${possiblePorts[possiblePortsArrayIndex]}`;
    fetch(responseIp);
    // fetch(responseIp)
    //   .then(response => {
    //     if (response.) {

    //     }
    //   });
  }, [possiblePortsArrayIndex]);

  return (
    <StyledBox>
      {!loading && buttonsNames.map((name, index) => (
        <ContainedButton
          key={index}
        >
          {name}
        </ContainedButton>
      ))}

      {loading && <CircularProgress />}

      {loadingError && (
        <Typography
          color="red"
        >
          Loading error
        </Typography>
      )}
    </StyledBox>
  )
};
