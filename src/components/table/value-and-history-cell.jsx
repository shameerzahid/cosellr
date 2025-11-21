import React from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export const ValueAndHistoryCell = ({
  value = 0,
  historyValue = 0,
  is_cos = false,
  target_cos = 0,
  is_total,
}) => {
  const theme = useTheme();

  // --- Safeguard values to handle null or undefined
  const safeValue = value == null ? 0 : value; // Replace null with 0
  const safeHistoryValue = historyValue == null ? 0 : historyValue; // Replace null with 0

  // --- Round numbers to integers
  const roundedValue = Math.round(safeValue);
  const roundedHistoryValue = Math.round(safeHistoryValue);

  // --- Format numbers as dollar amounts
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // No digits after the decimal point
    }).format(amount);

  // --- Determine COS status (for background)
  const cosStatus = is_cos
    ? roundedValue <= target_cos
      ? 'success'
      : roundedValue <= target_cos + 10
        ? 'warning'
        : 'error'
    : null;

  const cosColor = is_cos ? theme.palette[cosStatus]?.main : undefined;

  const baseTextColor = theme.palette.text.primary;

  // --- Gradient background for COS comparison
  const gradientBackground = is_cos
    ? `linear-gradient(135deg, 
        ${varAlpha(theme.palette[cosStatus]?.lighterChannel || '0 0 0', 0.48)}, 
        ${varAlpha(theme.palette[cosStatus]?.lightChannel || '0 0 0', 0.48)})`
    : '#f9f9f9';

  // --- Icon color logic
  const iconColor = is_cos
    ? roundedValue < roundedHistoryValue
      ? theme.palette.success.main // Green if value is smaller than history (COS logic)
      : roundedValue > roundedHistoryValue
        ? theme.palette.error.main // Red if value is greater than history
        : theme.palette.text.secondary // Neutral color if value equals history
    : roundedValue > roundedHistoryValue
      ? theme.palette.success.main // Green if value is greater than history (Currency logic)
      : roundedValue < roundedHistoryValue
        ? theme.palette.error.main // Red if value is smaller than history
        : theme.palette.text.secondary; // Neutral color if value equals history

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '8px 4px',
        borderRadius: 1,
        backgroundColor: is_total ? 'transparent' : '#f9f9f9', // Disable background color if is_total is true
        backgroundImage: is_total ? 'none' : is_cos ? gradientBackground : undefined, // Disable gradient if is_total is true
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        color: baseTextColor,
      }}
    >
      {/* First Row: Current Value */}
      <Stack direction="row" justifyContent="center" sx={{ width: '100%' }}>
        <Typography
          variant="body0"
          sx={{
            flex: 1,
            textAlign: 'center',
            color: baseTextColor, // Always use base text color for value
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center', // Align icon vertically
            justifyContent: 'center', // Center icon horizontally
          }}
        >
          {is_cos
            ? roundedValue === 100
              ? 'Max'
              : `${roundedValue}%`
            : formatCurrency(roundedValue)}{' '}
          {/* Add % for COS */}
          <Box sx={{ width: 4 }} /> {/* Small spacing between value and icon */}
          <Iconify
            width={24}
            icon={
              roundedValue > roundedHistoryValue
                ? 'solar:double-alt-arrow-up-bold-duotone'
                : roundedValue < roundedHistoryValue
                  ? 'solar:double-alt-arrow-down-bold-duotone'
                  : 'solar:minus-bold-duotone' // Neutral icon for equal values
            }
            sx={{
              flexShrink: 0,
              color: iconColor, // Use updated icon color logic
            }}
          />
        </Typography>
      </Stack>

      {/* Second Row: Historical Value */}
      <Stack direction="row" justifyContent="center" mt={1} sx={{ width: '100%' }}>
        <Typography
          variant="body1"
          sx={{
            flex: 1,
            textAlign: 'center',
            color: baseTextColor, // Match the color of historyValue to value
          }}
        >
          {is_cos
            ? roundedHistoryValue === 100
              ? 'Max'
              : `${roundedHistoryValue}%`
            : formatCurrency(roundedHistoryValue)}{' '}
          {/* Add % for COS */}
        </Typography>
      </Stack>
    </Box>
  );
};
