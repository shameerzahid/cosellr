/**
 * ValueAndRatioCell component displays a primary value (as currency or percentage)
 * and a historical value underneath, with visual indicators for performance.
 *
 * - The main value is shown in bold, formatted as currency (USD) or percentage (COS).
 * - An icon indicates whether the value has increased or decreased compared to history.
 * - The background and icon color adapt based on COS status and comparison to a target.
 * - Useful for showing metrics like revenue and their ratio to a target (e.g., $120,000 vs $100,000, ratio 20% with up icon).
 */

import React from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export const ValueAndRatioCell = ({
  value = 0,
  targetValue = 0, // Reduced parameters to value and targetValue
}) => {
  const theme = useTheme();

  // --- Round numbers to integers
  const roundedValue = Math.round(value);
  const roundedTargetValue = Math.round(targetValue);

  // --- Format numbers as dollar amounts
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // No digits after the decimal point
    }).format(amount);

  // --- Calculate difference ratio
  const difference = roundedTargetValue - roundedValue;
  const ratio =
    roundedValue > 0
      ? ((difference / roundedValue) * 100).toFixed(0) // Ratio as percentage
      : '-'; // If value is 0, set ratio to "-"

  // --- Icon color logic
  const iconColor =
    ratio !== '-' && ratio >= 0
      ? theme.palette.success.main // Green if ratio is positive
      : ratio !== '-' && ratio < 0
        ? theme.palette.error.main // Red if ratio is negative
        : theme.palette.text.secondary; // Neutral color if ratio is "-"

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '8px 4px',
        borderRadius: 1,
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        color: theme.palette.text.primary,
      }}
    >
      {/* First Row: Current Value */}
      <Stack direction="row" justifyContent="center" sx={{ width: '100%' }}>
        <Typography
          variant="body0"
          sx={{
            flex: 1,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {formatCurrency(roundedValue)} {/* Display formatted value */}
        </Typography>
      </Stack>

      {/* Second Row: Ratio and Icon */}
      <Stack direction="row" justifyContent="center" mt={1} sx={{ width: '100%' }}>
        <Typography
          variant="body1"
          sx={{
            flex: 1,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {`${ratio}%`} {/* Display ratio */}
          <Box sx={{ width: 4 }} /> {/* Small spacing between ratio and icon */}
          <Iconify
            width={24}
            icon={
              ratio === '-'
                ? 'solar:minus-bold-duotone' // Neutral icon for "-"
                : ratio >= 0
                  ? 'solar:double-alt-arrow-up-bold-duotone' // Up arrow for positive ratio
                  : 'solar:double-alt-arrow-down-bold-duotone' // Down arrow for negative ratio
            }
            sx={{
              flexShrink: 0,
              color: iconColor, // Use updated icon color logic
            }}
          />
        </Typography>
      </Stack>
    </Box>
  );
};
