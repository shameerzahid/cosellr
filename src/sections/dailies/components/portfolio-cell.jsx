import TableCell from '@mui/material/TableCell';

import { StatusIndicator } from './status-indicator';

// ----------------------------------------------------------------------

/**
 * Portfolio Cell Component
 * Displays a single checklist item status for a portfolio row
 * @param {number} status - Status value from the portfolio daily record
 * @param {function} onClick - Click handler to open drawer
 * @param {string} fieldLabel - Label for the checklist field (for tooltip)
 */
export function PortfolioCell({ status, onClick, fieldLabel }) {
  return (
    <TableCell
      sx={{
        padding: '12px 8px',
        verticalAlign: 'middle',
        textAlign: 'center',
      }}
    >
      <StatusIndicator status={status} onClick={onClick} fieldLabel={fieldLabel} />
    </TableCell>
  );
}

