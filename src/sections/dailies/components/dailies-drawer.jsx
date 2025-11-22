import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { getChecklistFieldLabel } from './checklist-fields';

// ----------------------------------------------------------------------

/**
 * Dailies Drawer Component
 * Displays history logs and allows adding new logs for a checklist item
 * @param {boolean} open - Whether drawer is open
 * @param {function} onClose - Close handler
 * @param {Object} selectedItem - Selected checklist item data
 * @param {Array} history - History logs array
 * @param {boolean} isLoading - Loading state
 * @param {Object} error - Error state
 * @param {function} onSave - Save handler
 * @param {boolean} isSaving - Whether save is in progress
 */
export function DailiesDrawer({
  open,
  onClose,
  selectedItem,
  history = [],
  isLoading = false,
  error = null,
  onSave,
  isSaving = false,
}) {
  const [newLog, setNewLog] = useState('');

  // Group history by date
  const groupedHistory = history.reduce((acc, log) => {
    const date = log.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {});

  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(groupedHistory).sort((a, b) => new Date(b) - new Date(a));

  const handleCancel = () => {
    setNewLog('');
    onClose();
  };

  const handleSave = async () => {
    if (newLog.trim() && onSave && !isSaving) {
      const logText = newLog.trim();
      setNewLog(''); // Clear input immediately for better UX
      await onSave(logText);
    }
  };

  const renderHeader = () => {
    if (!selectedItem) return null;

    const { type, portfolioName, marketplaceName, asin, field } = selectedItem;
    const fieldLabel = getChecklistFieldLabel(field);

    return (
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            {fieldLabel}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {type === 'portfolio' ? (
              <>
                {portfolioName} • {marketplaceName}
              </>
            ) : (
              <>ASIN: {asin}</>
            )}
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{
            ml: 1,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Iconify icon="mingcute:close-line" width={20} />
        </IconButton>
      </Box>
    );
  };

  const renderHistory = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={24} />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            Error loading history: {error?.message || 'Unknown error'}
          </Typography>
        </Box>
      );
    }

    if (sortedDates.length === 0) {
      return (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Iconify
            icon="solar:document-text-bold-duotone"
            width={64}
            sx={{ color: 'text.disabled', opacity: 0.5 }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            No history logs found
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            Start adding logs to track changes over time
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ px: 2.5, py: 2 }}>
        {sortedDates.map((date, dateIndex) => {
          const dateObj = new Date(date + 'T00:00:00');
          const isToday = dateObj.toDateString() === new Date().toDateString();
          const isYesterday =
            dateObj.toDateString() ===
            new Date(Date.now() - 86400000).toDateString();

          let dateLabel = dateObj.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          if (isToday) dateLabel = 'Today';
          else if (isYesterday) dateLabel = 'Yesterday';

          return (
            <Box key={date} sx={{ mb: dateIndex < sortedDates.length - 1 ? 3 : 0 }}>
              {/* Date Header */}
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  mb: 1.5,
                  display: 'block',
                  fontSize: '0.75rem',
                }}
              >
                {dateLabel}
              </Typography>

              {/* Logs for this date */}
              {groupedHistory[date].map((log, logIndex) => (
                <Card
                  key={logIndex}
                  sx={(theme) => ({
                    p: 2,
                    mb: 1.5,
                    bgcolor: 'background.neutral',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1.5,
                    boxShadow: 'none',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  })}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      lineHeight: 1.6,
                      color: 'text.primary',
                    }}
                  >
                    {log.log}
                  </Typography>
                </Card>
              ))}
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderInput = () => (
    <Box
      sx={{
        p: 2.5,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
        Add New Log
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={newLog}
        onChange={(e) => setNewLog(e.target.value)}
        placeholder="Enter new log entry..."
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          disabled={isSaving}
          sx={{ minWidth: 80 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!newLog.trim() || isSaving}
          sx={{ minWidth: 80 }}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: {
            width: { xs: '100%', sm: 400 },
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {renderHeader()}

      <Scrollbar sx={{ flex: 1 }}>
        {renderHistory()}
      </Scrollbar>

      {renderInput()}
    </Drawer>
  );
}

