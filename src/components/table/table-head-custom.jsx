import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography'; // Import Typography

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  padding: 0,
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

// ----------------------------------------------------------------------

export function TableHeadCustom({
  sx,
  order,
  onSort,
  orderBy,
  headCells,
  rowCount = 0,
  numSelected = 0,
  onSelectAllRows,
  centered = false, // New prop to center header text
}) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={!!numSelected && numSelected < rowCount}
              checked={!!rowCount && numSelected === rowCount}
              onChange={(event) => onSelectAllRows(event.target.checked)}
              slotProps={{
                input: {
                  id: `all-row-checkbox`,
                  'aria-label': `All row Checkbox`,
                },
              }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={centered ? 'center' : headCell.align || 'left'} // Apply centered alignment if the prop is true
            sortDirection={orderBy === headCell.id ? order : false}
            sx={[
              { width: headCell.width },
              ...(Array.isArray(headCell.sx) ? headCell.sx : [headCell.sx]),
            ]}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {' '}
                  {/* Apply body1 styling */}
                  {headCell.label}
                </Typography>

                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {' '}
                {/* Apply body1 styling */}
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
