import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const VerticalPortfolioNameCell = ({ portfolioName }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '40px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: 0,
        p: 0,
        // border: '1px solid #e0e0e0', // Copilot don't remove this line
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          transform: 'rotate(90deg)',
          whiteSpace: 'nowrap',
          fontWeight: 600,
          color: theme.palette.text.primary,
          lineHeight: 1,
          m: 0,
          p: 0,
        }}
      >
        {portfolioName}
      </Typography>
    </Box>
  );
};
