import React from 'react';
import CP from '@mui/material/CircularProgress';

import { colors } from '@constants/constants';

import './CircularProgress.css';

const { oldBurgundy } = colors;

const CircularProgress = () => {
  return (
    <CP
      sx={{
        color: oldBurgundy[500],
      }}
      thickness={6}
    />
  );
};

export default CircularProgress;
