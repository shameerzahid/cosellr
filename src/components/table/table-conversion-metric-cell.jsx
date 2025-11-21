import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Iconify } from 'src/components/iconify';

export function TableConversionMetricCell({ views, orders, conversionRate }) {
  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'start',
        alignItems: 'center',
        rowGap: 1,
        columnGap: 0.5,
        border: (theme) => `1px solid ${theme.palette.divider}`, // Add border
        borderRadius: 1, // Add curved corners
        p: 1, // Add padding inside the cell
      }}
    >
      {/* Session Cell*/}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Align content to the left
          alignItems: 'flex-start',
          gap: 0.5,
          gridColumn: 1,
          gridRow: 1,
        }}
      >
        <Iconify width={18} icon="solar:eye-bold" sx={{ color: 'text.disabled' }} />
        <Box sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
          <span>{views}</span> {/* Display views */}
        </Box>
      </Box>

      {/* Orders Cell */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Align content to the left
          alignItems: 'flex-start',
          gap: 0.5,
          gridColumn: 1,
          gridRow: 2,
        }}
      >
        <Iconify width={16} icon="solar:bag-bold" sx={{ color: 'text.disabled' }} />
        <Box sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
          <span>{orders}</span> {/* Display orders */}
        </Box>
      </Box>

      {/* Conversion Rate Cell */}
      <Box
        sx={{
          gridColumn: 2,
          gridRow: '1 / span 2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">{conversionRate}%</Typography> {/* Display conversion rate */}
      </Box>
    </Box>
  );
}
