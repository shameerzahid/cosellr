import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Rating from '@mui/material/Rating';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Iconify } from 'src/components/iconify';
import Typography from '@mui/material/Typography';

import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { TableConversionMetricCell } from 'src/components/table/table-conversion-metric-cell';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'asin', label: 'ASIN', align: 'center' }, // Center-align header
  { id: 'reporting_month', label: 'Jul 2025', align: 'center' }, // Center-align header
  { id: 'last_month', label: 'June 2025', align: 'center' }, // Center-align header
  { id: 'month_year_1', label: 'Jul 2024', align: 'center' }, // Center-align header
  { id: 'month_year_2', label: 'Jul 2023', align: 'center' }, // Center-align header
  { id: 'month_year_3', label: 'Jul 2022', align: 'center' }, // Center-align header
];

const TABLE_DATA = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3 },
  { name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 3.9 },
];

// ----------------------------------------------------------------------

export function BasicTable() {
  return (
    <Scrollbar sx={{ minHeight: 332 }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHeadCustom
          headCells={TABLE_HEAD.map((header) => ({
            ...header,
            align: 'center', // Ensure all headers are center-aligned
          }))}
        />

        <TableBody>
          {TABLE_DATA.map((row) => (
            <TableRow key={row.name} sx={{ height: '40px' }}>
              {/* ASIN Column */}
              <TableCell align="left" sx={{ whiteSpace: 'nowrap', px: 0.5, py: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.1 }}>
                  <Box component="span" sx={{ typography: 'body2', lineHeight: 1.2 }}>
                    Asin here
                  </Box>
                  <Box
                    component="span"
                    sx={{ typography: 'caption', color: 'text.secondary', lineHeight: 1 }}
                  >
                    Keep static text
                  </Box>
                </Box>
              </TableCell>

              {/* Replace other columns with TableConversionMetricCell */}
              <TableCell align="right" sx={{ px: 0.5, py: 1 }}>
                <TableConversionMetricCell views={12345} orders={67} conversionRate={15} />
              </TableCell>

              <TableCell align="right" sx={{ px: 0.5, py: 1 }}>
                <TableConversionMetricCell views={23456} orders={89} conversionRate={20} />
              </TableCell>

              <TableCell align="right" sx={{ px: 0.5, py: 1 }}>
                <TableConversionMetricCell views={34567} orders={45} conversionRate={25} />
              </TableCell>

              <TableCell align="right" sx={{ px: 0.5, py: 1 }}>
                <TableConversionMetricCell views={45678} orders={12} conversionRate={30} />
              </TableCell>

              <TableCell align="right" sx={{ px: 0.5, py: 1 }}>
                <TableConversionMetricCell views={56789} orders={34} conversionRate={35} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  );
}
