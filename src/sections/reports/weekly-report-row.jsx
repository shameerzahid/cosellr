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
import { ValueAndHistoryCell } from 'src/components/table/value-and-history-cell'; // Import the reusable component
import { ValueAndRatioCell } from 'src/components/table/value-and-ratio-cell'; // Import the reusable component
import { PourcentageAndHistoryCell } from 'src/components/table/pourcentage-and-history-cell'; // Import the reusable component
import { VerticalPortfolioNameCell } from 'src/components/table/vertical-porfolio-name-cell'; // Ensure this is imported

// import { UserQuickEditForm } from './user-quick-edit-form';

// ----------------------------------------------------------------------

export function WeeklyReportRow({ row, selected, onSelectRow, onDeleteRow }) {
  // console.log('Portfolio:', row); // Log the row data for debugging
  const { portfolio, last_week, week_minus_one } = row;

  const portfolio_name = portfolio.name || 'Unknown Portfolio'; // Fallback to 'Unknown Portfolio' if not defined
  const tcos_target = portfolio?.tcos_target ?? 0; // Fallback to '-' if not defined
  const acos_offset = 10;
  const is_total = portfolio.is_total || false; // Default to false if not defined

  // Extract data from last_week and week_minus_one
  const lw_total_sales = last_week?.total_sales ?? 0;
  const lw_ppc_sales = last_week?.ppc_sales ?? 0;
  const lw_ppc_spend = last_week?.ppc_spend ?? 0;
  const lw_tcos = last_week?.tcos ?? 0;
  const lw_acos = last_week?.acos ?? 0;

  const wmo_total_sales = week_minus_one?.total_sales ?? 0;
  const wmo_ppc_sales = week_minus_one?.ppc_sales ?? 0;
  const wmo_ppc_spend = week_minus_one?.ppc_spend ?? 0;
  const wmo_tcos = week_minus_one?.tcos ?? 0;
  const wmo_acos = week_minus_one?.acos ?? 0;

  return (
    <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
      {/* ________ Portfolio Column ________*/}
      <TableCell sx={{ padding: '8px 8px', verticalAlign: 'middle' }}>
        <Typography variant="body0">{portfolio_name}</Typography>
        <Typography variant="body2">Targ: {tcos_target}%</Typography>
      </TableCell>

      {/* ________ HISTORY ________*/}
      {
        Array.isArray(row.weekly_sales_archive) // Check if weekly_sales_archive is an array
          ? row.weekly_sales_archive
              .filter((archive) => {
                const currentYear = new Date().getFullYear();
                return archive.year >= 2022 && archive.year <= currentYear - 1; // Filter years from 2022 to last year
              })
              .map((archive) => (
                <TableCell key={archive.year} sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
                  <ValueAndRatioCell
                    value={archive.sales} // Yearly sales value
                    targetValue={lw_total_sales} // Last week's total sales
                  />
                </TableCell>
              ))
          : null /* If weekly_sales_archive is undefined or not an array, render nothing */
      }

      {/* ________ Total Sales ________*/}
      <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
        <ValueAndHistoryCell
          value={lw_total_sales} // Example value
          historyValue={wmo_total_sales} // Example history value
        />
      </TableCell>

      {/* ________ TCOS ________*/}
      <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
        <ValueAndHistoryCell
          value={lw_tcos} // Example value
          historyValue={wmo_tcos} // Example history value
          is_cos // Boolean attribute, no need to explicitly assign true
          target_cos={tcos_target} // Example target COS value
          is_total={is_total} // Pass is_total prop
        />
      </TableCell>

      {/* ________ ACOS ________*/}
      <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
        <ValueAndHistoryCell
          value={lw_acos} // Example value
          historyValue={wmo_acos} // Example history value
          is_cos // Boolean attribute, no need to explicitly assign true
          target_cos={tcos_target + acos_offset} // Example target COS value
          is_total={is_total} // Pass is_total prop
        />
      </TableCell>

      {/* ________ ORG | PPC ________*/}
      <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
        <PourcentageAndHistoryCell
          total={lw_total_sales} // Example total value
          ppc={lw_ppc_sales} // Example PPC value
          total_history={wmo_total_sales} // Example total history value
          ppc_history={wmo_ppc_sales} // Example PPC history value
        />
      </TableCell>

      {/* ________ PPC Sales ________*/}
      <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
        <ValueAndHistoryCell
          value={lw_ppc_sales} // Example value
          historyValue={wmo_ppc_sales} // Example history value
        />
      </TableCell>

      {/* ________ PPC Spend ________*/}
      <TableCell sx={{ padding: '8px 4px', verticalAlign: 'middle' }}>
        <ValueAndHistoryCell
          value={lw_ppc_spend} // Example value
          historyValue={wmo_ppc_spend} // Example history value
        />
      </TableCell>

      {/* ________ Vertical Portfolio Name ________*/}
      <TableCell
        sx={{
          padding: '0px 0px',
          verticalAlign: 'middle',
          height: '100%',
          width: '70px', // ← fixed width here
        }}
      >
        <VerticalPortfolioNameCell portfolioName={portfolio_name} />
      </TableCell>
    </TableRow>
  );
}
