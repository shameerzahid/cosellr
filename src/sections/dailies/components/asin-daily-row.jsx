import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { AsinDailyCell } from './asin-daily-cell';
import { CHECKLIST_FIELDS } from './checklist-fields';

// ----------------------------------------------------------------------

/**
 * ASIN Daily Row Component
 * Displays an ASIN with its 12 checklist items
 * Nested inside a portfolio row
 * @param {Object} asinDaily - ASIN daily record from API
 * @param {function} onChecklistItemClick - Handler for clicking a checklist item
 */
export function AsinDailyRow({ asinDaily, onChecklistItemClick }) {
  const {
    id,
    asin,
    asin_str,
    asin_short_name,
    asin_daily_id,
    negative_feedback,
    negative_reviews,
    star_rating,
    voice_customer,
    inventory_availability,
    oversize,
    fba_overcharges,
    deals_error,
    listing_completeness,
    buybox_hijacker,
    main_category,
    sub_category,
  } = asinDaily;

  // Use asin_str if available, otherwise fall back to asin
  const displayAsin = asin_str || asin;

  // Map of checklist fields to their status values
  const checklistStatuses = {
    negative_feedback,
    negative_reviews,
    star_rating,
    voice_customer,
    inventory_availability,
    oversize,
    fba_overcharges,
    deals_error,
    listing_completeness,
    buybox_hijacker,
    main_category,
    sub_category,
  };

  const handleChecklistClick = (fieldId) => {
    if (onChecklistItemClick) {
      // Get the current status value for this field
      const currentStatus = checklistStatuses[fieldId];
      onChecklistItemClick({
        type: 'asin',
        asinDailyId: id || asin_daily_id,
        field: fieldId,
        asin: displayAsin,
        currentStatus: currentStatus?.toString() || '1', // Convert to string for API
      });
    }
  };

  return (
    <TableRow 
      hover
      sx={{
        bgcolor: 'background.neutral',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      {/* ASIN Info Column */}
      <TableCell
        sx={{
          padding: '12px 16px 12px 56px', // Extra left padding for nesting
          verticalAlign: 'middle',
          minWidth: 200,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Iconify 
            icon="solar:tag-bold" 
            width={16} 
            sx={{ color: 'text.secondary', flexShrink: 0 }} 
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
              {displayAsin}
            </Typography>
            {asin_short_name && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  display: 'block',
                  mt: 0.25,
                }}
              >
                {asin_short_name}
              </Typography>
            )}
          </Box>
        </Box>
      </TableCell>

      {/* 12 Checklist Items */}
      {CHECKLIST_FIELDS.map((field) => (
        <AsinDailyCell
          key={field.id}
          status={checklistStatuses[field.id]}
          onClick={() => handleChecklistClick(field.id)}
          fieldLabel={field.label}
        />
      ))}
    </TableRow>
  );
}

