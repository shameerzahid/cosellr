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

  // Status mapping: 1 = OK/Good, 2 = Warning, etc.
  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case 1:
        return 'success'; // Green
      case 2:
        return 'warning'; // Yellow/Orange
      case 3:
        return 'error'; // Red
      default:
        return 'default'; // Gray
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 1:
        return 'solar:check-circle-bold'; // Check mark
      case 2:
        return 'solar:danger-triangle-bold'; // Warning
      case 3:
        return 'solar:close-circle-bold'; // Error
      default:
        return 'solar:circle-bold'; // Default circle
    }
  };

  const getStatusText = (statusValue) => {
    switch (statusValue) {
      case 1:
        return 'OK';
      case 2:
        return 'Warning';
      case 3:
        return 'Error';
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
      <Iconify
        icon={icon}
        width={18}
        sx={{
          color: (theme) => {
            if (color === 'success') return theme.palette.success.main;
            if (color === 'warning') return theme.palette.warning.main;
            if (color === 'error') return theme.palette.error.main;
            return theme.palette.text.disabled;
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: (theme) => {
            if (color === 'success') return theme.palette.success.main;
            if (color === 'warning') return theme.palette.warning.main;
            if (color === 'error') return theme.palette.error.main;
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

