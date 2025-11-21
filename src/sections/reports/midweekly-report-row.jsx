import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';
import { MetricTableCell } from 'src/components/table/metric-table-cell'; // Import the reusable component
import { AnnualHistoryTableCell } from 'src/components/table/anual-history-table-cell'; // Ensure this is imported
import { VerticalPortfolioNameCell } from 'src/components/table/vertical-porfolio-name-cell'; // Ensure this is imported

// import { UserQuickEditForm } from './user-quick-edit-form';

// ----------------------------------------------------------------------

export function MidweeklyReportRow({ row, selected, visibleColumns }) {
  const { portfolio_name, owner, tcos_target, metrics, current_week, last_week, weekly_history } =
    row;

  // Days of the week mapping
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return (
    <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
      {/* Portfolio Column */}
      {visibleColumns.portfolio && (
        <TableCell sx={{ padding: '8px 8px', verticalAlign: 'middle' }}>
          <Typography variant="body0">{portfolio_name}</Typography>
          <Typography variant="body2">Targ: {tcos_target}%</Typography>
        </TableCell>
      )}

      {/* Metrics for Each Day */}
      {days.map((day) =>
        visibleColumns[day] ? (
          <TableCell key={day} sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
            <MetricTableCell
              totalSales={metrics[day]?.total_sales ?? '-'}
              tacos={metrics[day]?.tcos ?? '-'}
              ppcSales={metrics[day]?.ppc_sales ?? '-'}
              ppcSpend={metrics[day]?.ppc_spend ?? '-'}
              acos={metrics[day]?.acos ?? '-'}
              tacosTarget={tcos_target}
            />
          </TableCell>
        ) : null
      )}

      {/* This Week */}
      {visibleColumns.thisWeek && (
        <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle', height: '100%' }}>
          <MetricTableCell
            totalSales={current_week.total_sales ?? '-'}
            tacos={current_week.tcos ?? '-'}
            ppcSales={current_week.ppc_sales ?? '-'}
            ppcSpend={current_week.ppc_spend ?? '-'}
            acos={current_week.acos ?? '-'}
            tacosTarget={tcos_target}
            isSummary // Pass the flag to indicate summary cells
          />
        </TableCell>
      )}

      {/* Last Week */}
      {visibleColumns.lastWeek && (
        <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle', height: '100%' }}>
          <MetricTableCell
            totalSales={last_week.total_sales ?? '-'}
            tacos={last_week.tcos ?? '-'}
            ppcSales={last_week.ppc_sales ?? '-'}
            ppcSpend={last_week.ppc_spend ?? '-'}
            acos={last_week.acos ?? '-'}
            tacosTarget={tcos_target}
            isSummary // Pass the flag to indicate summary cells
          />
        </TableCell>
      )}

      {/* History */}
      {visibleColumns.history && (
        <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
          <AnnualHistoryTableCell history={weekly_history} currentWeek={current_week.total_sales} />
        </TableCell>
      )}

      <TableCell
        sx={{
          padding: '0px 0px',
          verticalAlign: 'middle',
          height: '100%',
          width: '70px', // ← fixed width here
          // border: '1px solid #e0e0e0', // Copilote don't remove this line
        }}
      >
        <VerticalPortfolioNameCell portfolioName={portfolio_name} />
      </TableCell>
    </TableRow>
  );
}
