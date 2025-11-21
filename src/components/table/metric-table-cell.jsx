import React from 'react';
import { varAlpha } from 'minimal-shared/utils';

import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';

export const MetricTableCell = ({
  totalSales,
  tacos,
  ppcSales,
  ppcSpend,
  acos,
  tacosTarget,
  isSummary,
  isDocumentation, // New parameter to indicate documentation mode
}) => {
  const theme = useTheme();

  // --- Color logic
  const tacosStatus =
    tacos <= tacosTarget ? 'success' : tacos <= tacosTarget + 10 ? 'warning' : 'error';

  const acosStatus = acos < 30 ? 'success' : acos <= 50 ? 'warning' : 'error';

  const tacosColor = isSummary
    ? theme.vars.palette[tacosStatus].dark
    : theme.palette[tacosStatus].main;

  const acosColor = isSummary
    ? theme.vars.palette[acosStatus].dark
    : theme.palette[acosStatus].main;

  const baseTextColor = isSummary ? theme.palette.text.primary : undefined;

  // --- Gradient background for summary
  const gradientBackground = isSummary
    ? `linear-gradient(135deg, 
        ${varAlpha(theme.vars.palette[tacosStatus].lighterChannel, 0.48)}, 
        ${varAlpha(theme.vars.palette[tacosStatus].lightChannel, 0.48)})`
    : '#f9f9f9';

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '8px 4px',
        borderRadius: 1,
        backgroundColor: isSummary ? 'common.white' : '#f9f9f9',
        backgroundImage: isSummary ? gradientBackground : undefined,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        color: baseTextColor, // Set default text color for all children
      }}
    >
      {/* First Row */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ width: '100%' }}>
        <Typography variant="body0" sx={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>
          {isDocumentation ? 'Total Sales' : `$${Math.round(totalSales ?? 0) || '0'}`}
        </Typography>
        <Typography
          variant="body0"
          sx={{
            flex: 1,
            textAlign: 'center',
            color: tacos >= 100 ? 'red' : isDocumentation ? undefined : tacosColor, // Red if tacos is >= 100%
            fontWeight: 'bold',
          }}
        >
          {isDocumentation ? 'TCos' : tacos >= 100 ? 'Max' : `${tacos ?? '0'}%`}{' '}
          {/* Replace with "Max" */}
        </Typography>
      </Stack>

      {/* Second Row */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={1} sx={{ width: '100%' }}>
        <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>
          {isDocumentation ? 'PPC Sales' : `$${Math.round(ppcSales ?? 0) || '0'}`}
        </Typography>
        <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>
          {isDocumentation ? 'PPC Spend' : `$${Math.round(ppcSpend ?? 0) || '0'}`}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flex: 1,
            textAlign: 'center',
            color: acos >= 100 ? 'red' : isDocumentation ? undefined : acosColor, // Red if acos is >= 100%
          }}
        >
          {isDocumentation ? 'ACOS' : acos >= 100 ? 'Max' : `${acos ?? '0'}%`}{' '}
          {/* Replace with "Max" */}
        </Typography>
      </Stack>
    </Box>
  );
};
