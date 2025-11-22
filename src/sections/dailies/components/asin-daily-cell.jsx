import TableCell from '@mui/material/TableCell';

import { StatusIndicator } from './status-indicator';

// ----------------------------------------------------------------------

/**
 * ASIN Daily Cell Component
 * Displays a single checklist item status for an ASIN row
 * @param {number} status - Status value from the ASIN daily record
 * @param {function} onClick - Click handler to open drawer
 * @param {string} fieldLabel - Label for the checklist field (for tooltip)
 */
export function AsinDailyCell({ status, onClick, fieldLabel }) {
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

