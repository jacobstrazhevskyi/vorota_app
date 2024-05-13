import React, { useEffect, useState } from 'react';

import {
  Box,
  LinearProgress,
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

const ProgressBox = styled(Box)({
  width: '100%',
});

type ContainedButtonHandlerProps = {
  pin: number,
  serverIp: string,
};

const ContainedButtonHandler = ({
  serverIp,
  pin,
}: ContainedButtonHandlerProps) => {
  console.log(serverIp);
  fetch(`${serverIp}/generate_impulse?pin=${pin}`);
};

export const AppContent: React.FC = () => {
  const [serverIp, setServerIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [possiblePortsArrayIndex, setPossiblePortsArrayIndex] = useState(0);
  const [loadingError, setLoadingError] = useState(false);
  
  const [responseReceived, setResponseReceived] = useState(false);
  
  const [pins, setPins] = useState<number[]>([]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  useEffect(() => {
    setLoading(true);

    if (possiblePortsArrayIndex >= possiblePorts.length) {
      setLoading(false);
      setLoadingError(true);
      return;
    }

    if (pins.length && responseReceived && serverIp.length) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const timeoutId = setTimeout(() => {
      setPossiblePortsArrayIndex(possiblePortsArrayIndex + 1);
    }, 200);

    const responseIp = `http://${possiblePorts[possiblePortsArrayIndex]}`;

    fetch(responseIp)
      .then(response => {
        clearTimeout(timeoutId);

        if (!isCancelled) {
          if (!response.ok) {
            throw new Error('Invalid response');
          }
          return response.json();
        }
      })
      .then(data => {
        if (!isCancelled) {
          setLoading(false);
          setPins(data);
          setServerIp(responseIp);
          setResponseReceived(true);
        }
      })
      .catch(error => {
        setLoading(false);
      })
  }, [possiblePortsArrayIndex, pins.length, responseReceived, serverIp.length]);

  return (
    <StyledBox>
      {(!loading && !loadingError) && pins.map((pin, index) => {
        const name = buttonsNames[index];

        return (
          <ContainedButton
            key={index}
            onClick={() => ContainedButtonHandler({
              serverIp,
              pin,
            })}
          >
            {name}
          </ContainedButton>
        )
      })}

      {loading && (
        <ProgressBox>
          <LinearProgress />
        </ProgressBox>
      )}

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
