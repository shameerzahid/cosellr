import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';

import { usePortfolioAsins } from 'src/hooks/usePortfolioAsins';
import { PortfolioCell } from './portfolio-cell';
import { AsinDailyRow } from './asin-daily-row';
import { CHECKLIST_FIELDS } from './checklist-fields';

// ----------------------------------------------------------------------

/**
 * Portfolio Row Component
 * Displays a portfolio with its 12 checklist items
 * Expands to show nested ASIN rows (Step 2)
 * @param {Object} portfolio - Portfolio daily record from API
 * @param {function} onChecklistItemClick - Handler for clicking a checklist item
 */
export function PortfolioRow({ portfolio, onChecklistItemClick }) {
  const expanded = useBoolean(false);
  
  // Fetch ASINs only when portfolio is expanded
  const { asins, isLoading: isLoadingAsins, error: asinsError } = usePortfolioAsins(
    portfolio.id,
    expanded.value
  );

  const {
    id,
    portfolio_id,
    portfolio_name,
    marketplace_name,
    date,
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
  } = portfolio;

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
      onChecklistItemClick({
        type: 'portfolio',
        portfolioDailyId: id,
        field: fieldId,
        portfolioName: portfolio_name,
        marketplaceName: marketplace_name,
      });
    }
  };

  return (
    <>
      <TableRow 
        hover
        sx={{
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        {/* Portfolio Info Column */}
        <TableCell
          sx={{
            padding: '16px',
            verticalAlign: 'middle',
            minWidth: 220,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              size="small"
              onClick={expanded.onToggle}
              sx={{ 
                p: 0.75,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  bgcolor: 'action.selected',
                  borderColor: 'primary.main',
                },
                transition: 'all 0.2s',
              }}
            >
              <Iconify
                icon={expanded.value ? 'solar:alt-arrow-down-bold' : 'solar:alt-arrow-right-bold'}
                width={18}
              />
            </IconButton>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Iconify 
                  icon="solar:folder-bold" 
                  width={18} 
                  sx={{ color: 'primary.main', flexShrink: 0 }} 
                />
                <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
                  {portfolio_name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={marketplace_name}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                  }}
                />
                {date && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.7rem',
                    }}
                  >
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </TableCell>

        {/* 12 Checklist Items */}
        {CHECKLIST_FIELDS.map((field) => (
          <PortfolioCell
            key={field.id}
            status={checklistStatuses[field.id]}
            onClick={() => handleChecklistClick(field.id)}
            fieldLabel={field.label}
          />
        ))}
      </TableRow>

      {/* Nested ASIN rows - Loading State */}
      {expanded.value && isLoadingAsins && (
        <TableRow>
          <TableCell colSpan={CHECKLIST_FIELDS.length + 1} sx={{ py: 3, textAlign: 'center' }}>
            <CircularProgress size={24} />
          </TableCell>
        </TableRow>
      )}

      {/* Nested ASIN rows - Error State */}
      {expanded.value && asinsError && (
        <TableRow>
          <TableCell colSpan={CHECKLIST_FIELDS.length + 1} sx={{ py: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'error.main' }}>
              Error loading ASINs: {asinsError?.message || 'Unknown error'}
            </Typography>
          </TableCell>
        </TableRow>
      )}

      {/* Nested ASIN rows - Empty State */}
      {expanded.value && !isLoadingAsins && !asinsError && asins.length === 0 && (
        <TableRow>
          <TableCell colSpan={CHECKLIST_FIELDS.length + 1} sx={{ py: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No ASINs found for this portfolio
            </Typography>
          </TableCell>
        </TableRow>
      )}

      {/* Nested ASIN rows - Data */}
      {expanded.value &&
        !isLoadingAsins &&
        !asinsError &&
        asins.length > 0 &&
        asins.map((asinDaily) => (
          <AsinDailyRow
            key={asinDaily.id || asinDaily.asin_daily_id || asinDaily.asin}
            asinDaily={asinDaily}
            onChecklistItemClick={onChecklistItemClick}
          />
        ))}
    </>
  );
}

