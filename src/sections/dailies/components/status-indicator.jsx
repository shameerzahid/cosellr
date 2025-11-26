import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Status Indicator Component
 * Displays the status of a checklist item with icon and text label
 * @param {number} status - Status value (1, 2, etc.)
 * @param {boolean} clickable - Whether the status is clickable
 * @param {function} onClick - Click handler function
 * @param {string} fieldLabel - Optional label for the checklist field (for tooltip)
 */
export function StatusIndicator({ status, clickable = true, onClick, fieldLabel }) {
  // Handle undefined/null status
  if (status === undefined || status === null) {
    status = 0;
  }

  // Status mapping: 0 = Off, 1 = OK, 2 = Warning, 3 = Error, 4 = Attention
  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case 0:
        return 'white'; // White
      case 1:
        return 'success'; // Green
      case 2:
        return 'warning'; // Yellow/Orange
      case 3:
        return 'error'; // Red
      case 4:
        return 'info'; // Blue
      default:
        return 'default'; // Gray
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 0:
        return 'solar:power-bold'; // Power/Off icon
      case 1:
        return 'solar:check-circle-bold'; // Check mark
      case 2:
        return 'solar:danger-triangle-bold'; // Warning
      case 3:
        return 'solar:close-circle-bold'; // Error
      case 4:
        return 'solar:info-circle-bold'; // Attention/Info
      default:
        return 'solar:circle-bold'; // Default circle
    }
  };

  const getStatusText = (statusValue) => {
    switch (statusValue) {
      case 0:
        return 'Off';
      case 1:
        return 'OK';
      case 2:
        return 'Warning';
      case 3:
        return 'Error';
      case 4:
        return 'Attention';
      default:
        return 'Not Set';
    }
  };

  const color = getStatusColor(status);
  const icon = getStatusIcon(status);
  const statusText = getStatusText(status);

  // Build tooltip text
  const tooltipTitle = fieldLabel
    ? `${fieldLabel}: ${statusText}`
    : `Status: ${statusText}`;

  const renderContent = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        cursor: clickable && onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        '&:hover': clickable && onClick ? {
          bgcolor: 'action.hover',
        } : {},
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: status === 0 ? 14 : 'auto',
          height: status === 0 ? 14 : 'auto',
          borderRadius: status === 0 ? '50%' : 0,
          bgcolor: (theme) => {
            // Small gray circular dot for Off status only
            if (status === 0) return theme.palette.action.selected;
            return 'transparent';
          },
        }}
      >
        <Iconify
          icon={icon}
          width={18}
          sx={{
            color: (theme) => {
              if (status === 0) return theme.palette.text.disabled; // Gray for Off
              if (color === 'success') return theme.palette.success.main;
              if (color === 'warning') return theme.palette.warning.main;
              if (color === 'error') return theme.palette.error.main;
              if (color === 'info') return theme.palette.info.main;
              return theme.palette.text.disabled;
            },
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: (theme) => {
            // Off (status 0) and OK (status 1) should have black text
            if (status === 0 || status === 1) return theme.palette.text.primary;
            // Others match icon color
            if (color === 'warning') return theme.palette.warning.main;
            if (color === 'error') return theme.palette.error.main;
            if (color === 'info') return theme.palette.info.main;
            return theme.palette.text.disabled;
          },
        }}
      >
        {statusText}
      </Typography>
    </Box>
  );

  if (clickable && onClick) {
    return (
      <Tooltip title={tooltipTitle} arrow>
        <Box
          onClick={onClick}
          sx={{
            display: 'inline-flex',
          }}
        >
          {renderContent()}
        </Box>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={tooltipTitle} arrow>
      <Box sx={{ display: 'inline-flex' }}>
        {renderContent()}
      </Box>
    </Tooltip>
  );
}

