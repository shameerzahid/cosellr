import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';

export const AnnualHistoryTableCell = ({ history }) => {
  const theme = useTheme();

  const baseTextColor = theme.palette.text.primary;

  const gradientBackground = `linear-gradient(135deg, 
    rgba(200, 200, 200, 0.3), 
    rgba(230, 230, 230, 0.6))`;

  const accentColor = theme.palette.grey[800];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '2px 10px 2px 10px',
        borderRadius: 1,
        backgroundColor: 'common.white',
        backgroundImage: gradientBackground,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        color: baseTextColor,
      }}
    >
      {/* Historical Data */}
      {Object.entries(history)
        .filter(([key]) => key !== 'current_week') // Exclude current_week from history
        .map(([year, totalSales]) => (
          <Stack
            key={year}
            direction="row"
            spacing={0}
            justifyContent="flex-start"
            mt={0.2}
            sx={{ width: '100%' }}
          >
            <Typography
              variant="body2"
              sx={{
                width: '48%',
                pl: 0,
                textAlign: 'left',
                minWidth: 0,
              }}
            >
              {year}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                width: '52%',
                pr: 1,
                textAlign: 'left',
                color: accentColor,
                minWidth: 0,
              }}
            >
              ${totalSales}
            </Typography>
          </Stack>
        ))}
    </Box>
  );
};
