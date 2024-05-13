import React, { useEffect, useState } from 'react';

import {
  Box,
  LinearProgress,
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

const StyledLinearProgress = styled(LinearProgress)({
  width: '100%',
});

type CheckButtonStateProps = {
  index: number,
  pin: number,
};

export const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [buttonsStates, setButtonsStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [buttonsDisabled, setButtonsDisabled] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  console.log(buttonsDisabled);

  const [pins, setPins] = useState<number[]>([]);

  const checkButtonState = ({
    index,
    pin,
  }: CheckButtonStateProps) => {
    fetch(`${SERVER_IP}/get_state?pin={${pin}}`)
      .then(response => response.json())
      .then(data => {
        const newButtonsState = buttonsStates;
        newButtonsState[index] = data;

        setButtonsStates(newButtonsState);
      });
  };

  const handleDisabled = (index: number) => {
    console.log(buttonsDisabled);

    const newButtonsDisabled = buttonsDisabled;
    newButtonsDisabled[index] = true;

    setButtonsDisabled(newButtonsDisabled);

    setTimeout(() => {
      const newButtonsDisabled = buttonsDisabled;
      newButtonsDisabled[index] = false;

      setButtonsDisabled(newButtonsDisabled);
    }, 1000);
  };

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
      {!loading && !loadingError && buttonsNames.map((name, index) => (
        <>
          {/* {buttonsStates[index] ? <Typography>Открыты</Typography> : <Typography>Закрыты</Typography>} */}
          <ContainedButton
            disabled={buttonsDisabled[index]}
            key={index}
            onClick={() => {

              handleDisabled(index);

              const pin = pins[index];
              fetch(`${SERVER_IP}/generate_impulse?pin=${pin}`);


              // checkButtonState({ pin, index });
            }}
          >
            {name}
          </ContainedButton>
        </>
      ))}

      {loading && (
        <StyledLinearProgress />
      )}

      {loadingError && (
        <Typography
          color="red"
          fontSize={24}
        >
          Loading error
        </Typography>
      )}
    </StyledBox>
  )
};
