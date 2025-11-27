import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
  const [selectedStatus, setSelectedStatus] = useState('1'); // Default to OK (1)

  // Reset status when drawer opens/closes or selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      // Use current status if available, otherwise default to 1
      // Works for both ASIN and Portfolio items
      setSelectedStatus(selectedItem.currentStatus?.toString() || '1');
    } else {
      setSelectedStatus('1');
    }
  }, [selectedItem, open]);

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
    setSelectedStatus('1');
    onClose();
  };

  const handleSave = async () => {
    console.log('[Drawer] handleSave called:', {
      onSave: !!onSave,
      isSaving,
      selectedItem,
      newLog,
      selectedStatus,
    });

    if (!onSave || isSaving) {
      console.log('[Drawer] Cannot save - onSave missing or already saving');
      return;
    }

    const isAsinLog = selectedItem?.type === 'asin';
    const logText = newLog.trim();
    const hasLogText = logText.length > 0;
    
    // For ASIN logs: allow saving if status changed OR log text provided
    // For portfolio logs: require log text (no status updates)
    if (isAsinLog) {
      const initialStatus = selectedItem?.currentStatus?.toString() || '1';
      const statusChanged = selectedStatus !== initialStatus;
      
      console.log('[Drawer] ASIN log save check:', {
        initialStatus,
        selectedStatus,
        statusChanged,
        hasLogText,
        logText,
      });
      
      if (statusChanged || hasLogText) {
        console.log('[Drawer] Saving ASIN log with:', {
          logText: logText || '',
          selectedStatus,
        });
        setNewLog(''); // Clear input immediately for better UX
        await onSave(logText || '', selectedStatus);
      } else {
        console.log('[Drawer] Nothing to save for ASIN log');
      }
    } else {
      // Portfolio logs require log text
      if (hasLogText) {
        console.log('[Drawer] Saving portfolio log with:', { logText });
        setNewLog(''); // Clear input immediately for better UX
        await onSave(logText);
      } else {
        console.log('[Drawer] Portfolio log requires text');
      }
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Status options for dropdown
  const statusOptions = [
    { value: '0', label: 'Off', icon: 'solar:power-bold', color: 'disabled' },
    { value: '1', label: 'OK', icon: 'solar:check-circle-bold', color: 'success.main' },
    { value: '2', label: 'Warning', icon: 'solar:danger-triangle-bold', color: 'warning.main' },
    { value: '3', label: 'Error', icon: 'solar:close-circle-bold', color: 'error.main' },
    { value: '4', label: 'Attention', icon: 'solar:info-circle-bold', color: 'info.main' },
  ];

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

  const renderInput = () => {
    const isAsinLog = selectedItem?.type === 'asin';

    return (
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
        
        {/* Status Selector - Enabled for ASIN logs, Disabled for Portfolio logs */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <FormControl 
            sx={{ 
              width: 'auto',
              minWidth: 120,
            }} 
            size="small" 
            disabled={!isAsinLog}
          >
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            label="Status"
            onChange={handleStatusChange}
            disabled={!isAsinLog}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
              PaperProps: {
                sx: {
                  minWidth: 140,
                  maxHeight: 200,
                },
              },
            }}
            renderValue={(value) => {
              const option = statusOptions.find((opt) => opt.value === value);
              if (!option) return value;
              const [colorName] = option.color.split('.');
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: option.value === '0' ? 14 : 'auto',
                      height: option.value === '0' ? 14 : 'auto',
                      borderRadius: option.value === '0' ? '50%' : 0,
                      bgcolor: (theme) => {
                        // Small gray circular dot for Off status only
                        if (option.value === '0') return theme.palette.action.selected;
                        return 'transparent';
                      },
                    }}
                  >
                    <Iconify 
                      icon={option.icon} 
                      width={18} 
                      sx={{ 
                        color: (theme) => {
                          if (option.value === '0') return theme.palette.text.disabled; // Gray for Off
                          if (colorName === 'success') return theme.palette.success.main;
                          if (colorName === 'warning') return theme.palette.warning.main;
                          if (colorName === 'error') return theme.palette.error.main;
                          if (colorName === 'info') return theme.palette.info.main;
                          return theme.palette.text.primary;
                        }
                      }} 
                    />
                  </Box>
                  <Typography 
                    variant="body2"
                    sx={{
                      // For Off (0) and OK (1), don't set color - let Typography use default theme color
                      ...(option.value !== '0' && option.value !== '1' && {
                        color: (theme) => {
                          // Others match icon color
                          if (colorName === 'warning') return theme.palette.warning.main;
                          if (colorName === 'error') return theme.palette.error.main;
                          if (colorName === 'info') return theme.palette.info.main;
                          return theme.palette.text.primary;
                        },
                      }),
                    }}
                  >
                    {option.label}
                  </Typography>
                </Box>
              );
            }}
          >
            {statusOptions.map((option) => {
              const [colorName] = option.color.split('.');
              return (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: option.value === '0' ? 14 : 'auto',
                        height: option.value === '0' ? 14 : 'auto',
                        borderRadius: option.value === '0' ? '50%' : 0,
                        bgcolor: (theme) => {
                          // Small gray circular dot for Off status only
                          if (option.value === '0') return theme.palette.action.selected;
                          return 'transparent';
                        },
                      }}
                    >
                      <Iconify 
                        icon={option.icon} 
                        width={18} 
                        sx={{ 
                          color: (theme) => {
                            if (option.value === '0') return theme.palette.text.disabled; // Gray for Off
                            if (colorName === 'success') return theme.palette.success.main;
                            if (colorName === 'warning') return theme.palette.warning.main;
                            if (colorName === 'error') return theme.palette.error.main;
                            if (colorName === 'info') return theme.palette.info.main;
                            return theme.palette.text.primary;
                          }
                        }} 
                      />
                    </Box>
                      <Typography 
                        variant="body2"
                        sx={{
                          // For Off (0) and OK (1), don't set color - let Typography use default theme color
                          ...(option.value !== '0' && option.value !== '1' && {
                            color: (theme) => {
                              // Others match icon color
                              if (colorName === 'warning') return theme.palette.warning.main;
                              if (colorName === 'error') return theme.palette.error.main;
                              if (colorName === 'info') return theme.palette.info.main;
                              return theme.palette.text.primary;
                            },
                          }),
                        }}
                      >
                        {option.label}
                      </Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          placeholder={isAsinLog ? "Enter log entry (optional)..." : "Enter new log entry..."}
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
            disabled={
              isSaving ||
              (isAsinLog
                ? selectedStatus === (selectedItem?.currentStatus?.toString() || '1') && !newLog.trim()
                : !newLog.trim())
            }
            sx={{ minWidth: 80 }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
    );
  };

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

