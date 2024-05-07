import React, { useEffect, useState } from 'react';

import {
  Box,
  CircularProgress,
  Typography,
  styled,
} from '@mui/material';

import { buttonsNames } from '../../aux/buttonsNames';
import { ContainedButton } from '../ContainedButton';
import { SERVER_IP } from '../../aux/serverIp';

const StyledBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  marginTop: '100px',
});

export const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [pins, setPins] = useState<number[]>([]);

  console.log(pins);

  useEffect(() => {
    setLoading(true);

    fetch(SERVER_IP)
      .then(response => {
        if (!response.ok) {
          setLoadingError(true);
          throw new Error('Connection problems, fetch error');
        }

        return response.json();
      })
      .then(data => {
        setPins(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoadingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <StyledBox>
      {!loading && buttonsNames.map((name, index) => (
        <ContainedButton
          key={index}
          onClick={() => {
            const pin = pins[index];

            fetch(`${SERVER_IP}/generate_impulse?pin=${pin}`);
          }}
        >
          {name}
        </ContainedButton>
      ))}

      {loading && <CircularProgress />}
    </StyledBox>
  )
};
