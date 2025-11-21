/**
 * PourcentageAndHistoryCell component displays the percentage of paid and organic
 * traffic for current and historical data, allowing for quick comparison of performance
 * across two time periods.
 *
 * - The component shows four percentages: current PPC, current organic, historical PPC,
 *   and historical organic, each followed by a '%' sign.
 * - Colors are used to indicate the nature of the value: green for positive (PPC),
 *   blue for neutral (Organic), and red for negative (if applicable, not explicitly shown).
 * - The layout is responsive, adjusting to different screen sizes while maintaining
 *   readability and visual hierarchy.
 */

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';

export const PourcentageAndHistoryCell = ({
  total = 0,
  ppc = 0,
  total_history = 0,
  ppc_history = 0,
}) => {
  const theme = useTheme();

  // --- Safeguard calculations to avoid NaN
  const ppc_pourcentage = total > 0 && ppc >= 0 ? ((ppc / total) * 100).toFixed(0) : 0; // PPC percentage
  const org_pourcentage = total > 0 ? (100 - ppc_pourcentage).toFixed(0) : 0; // Organic percentage

  const ppc_pourcentage_history =
    total_history > 0 && ppc_history >= 0 ? ((ppc_history / total_history) * 100).toFixed(0) : 0; // PPC history percentage
  const org_pourcentage_history =
    total_history > 0 ? (100 - ppc_pourcentage_history).toFixed(0) : 0; // Organic history percentage

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '8px 4px',
        borderRadius: 1,
        backgroundColor: '#f9f9f9', // Match the background color of ValueAndRatioCell
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        color: theme.palette.text.primary,
      }}
    >
      {/* First Row: Current Percentages */}
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
          {`${ppc_pourcentage}%`}{' '}
          <span style={{ color: theme.palette.text.secondary }}>&nbsp;|&nbsp;</span>{' '}
          {`${org_pourcentage}%`}
        </Typography>
      </Stack>

      {/* Second Row: History Percentages */}
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
          {`${ppc_pourcentage_history}%`}{' '}
          <span style={{ color: theme.palette.text.secondary }}>&nbsp;|&nbsp;</span>{' '}
          {`${org_pourcentage_history}%`}
        </Typography>
      </Stack>
    </Box>
  );
};
