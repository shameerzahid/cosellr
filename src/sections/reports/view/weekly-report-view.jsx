import { useState, useCallback, useRef } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useBoolean, useSetState } from 'minimal-shared/hooks';
import html2canvas from 'html2canvas';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';
import { _roles, _userList, USER_STATUS_OPTIONS, _portfolios } from 'src/_mock';

import { Label } from 'src/components/label';
import { useAuthContext } from 'src/auth/hooks'; // Import the useAuthContext hook
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import { MetricTableCell } from 'src/components/table/metric-table-cell';

import { UserTableToolbar } from '../user-table-toolbar';
import { useWeeklyReport } from 'src/hooks/useWeeklyReport';
import { WeeklyReportRow } from '../weekly-report-row';
import { UserTableFiltersResult } from '../user-table-filters-result';

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'onTarget', label: 'On Target' },
  { value: 'close', label: 'Close' },
  { value: 'offTarget', label: 'Off Target' },
  { value: 'otr', label: 'OTR' },
];

// Get the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const dateParam = urlParams.get('date'); // Get the 'date' parameter from the URL

function getLastWeekSunday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) to 6 (Sat)
  d.setDate(d.getDate() - day - 6); // Go to start of this week, then back 7 days
  d.setHours(0, 0, 0, 0); // Normalize time
  return d;
}

// Determine the startDate
let startDate;
if (dateParam) {
  const parsedDate = new Date(dateParam);
  startDate = !isNaN(parsedDate)
    ? getLastWeekSunday(parsedDate).toISOString().split('T')[0]
    : getLastWeekSunday(new Date()).toISOString().split('T')[0];
} else {
  startDate = getLastWeekSunday(new Date()).toISOString().split('T')[0];
}

// Debug logs
console.log("Today's Date:", new Date().toISOString().split('T')[0]);
console.log('Last Week Sunday is:', startDate);

const TABLE_HEAD = [
  { id: 'portfolio', label: 'Portfolio', width: 80 },
  { id: 'year2022', label: '2022', width: 120 },
  { id: 'year2023', label: '2023', width: 120 },
  { id: 'year2024', label: '2024', width: 120 },
  { id: 'totalSales', label: 'Total Sales', width: 120 },
  { id: 'tcos', label: 'TCOS', width: 120 },
  { id: 'acos', label: 'ACOS', width: 120 },
  { id: 'pourcentage', label: 'PPC | ORG', width: 120 },
  { id: 'ppcSales', label: 'PPC Sales', width: 120 },
  { id: 'ppcSpend', label: 'PPC Spend', width: 120 },
];

// ----------------------------------------------------------------------

export function WeeklyReportView() {
  const table = useTable();
  const confirmDialog = useBoolean();
  const [tableData, setTableData] = useState([]); // Use mock data as the initial state
  const filters = useSetState({ name: '', role: [], status: 'all' });
  const { state: currentFilters, setState: updateFilters } = filters;

  const tableRef = useRef(null); // Ensure this is called at the top level

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name || currentFilters.role.length > 0 || currentFilters.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback((id) => {
    setTableData((prevData) => prevData.filter((row) => row.name !== id)); // Filter out the deleted row
  }, []);

  const { data, isLoading, error } = useWeeklyReport(startDate);

  // Log the data coming from the API
  // console.log('Data received from API:', data);

  const { user } = useAuthContext();

  console.log('Authenticated User:', user);

  const handleExportAsImage = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current, {
        backgroundColor: null, // Makes the background transparent
        scale: 2, // Improves image quality
      });

      const link = document.createElement('a');
      link.download = 'table-image.png'; // Set the file name
      link.href = canvas.toDataURL('image/png'); // Convert canvas to a PNG URL
      link.click(); // Trigger the download
    }
  };

  // Ensure all hooks are called before any return statement
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const porfolioRows = data?.portfolios || []; // Removed filtering logic
  // console.log('Portfolios Rows:', porfolioRows); // Log the portfolios data

  return (
    <>
      <DashboardContent maxWidth="xxl">
        <CustomBreadcrumbs
          heading="Weekly Report"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Report', href: paths.dashboard.reports.root },
            { name: 'Weekly Report' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          {/* <Box sx={{ position: 'relative' }}> */}
          <Box
            ref={tableRef} // Attach the ref to the Box containing the table
            sx={{
              position: 'relative',
              // border: '6px solid hotpink',
              borderRadius: 2, // optional, just for nicer corners
              padding: 2, // optional, spacing inside the border
              backgroundColor: (theme) => theme.palette.background.paper, // White/black based on theme mode
            }}
          >
            <Scrollbar>
              <Table size="medium" sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={porfolioRows.length}
                  numSelected={table.selected.length}
                  centered
                />

                <TableBody>
                  {porfolioRows.map((porfolioRow) => (
                    <WeeklyReportRow
                      key={porfolioRow.portfolio.id} // Ensure the key is unique
                      row={porfolioRow}
                      selected={table.selected.includes(porfolioRow.portfolio.name)}
                      onSelectRow={() => table.onSelectRow(porfolioRow.portfolio.name)}
                      onDeleteRow={() => handleDeleteRow(porfolioRow.portfolio.name)}
                    />
                  ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, porfolioRows.length)}
                  />

                  <TableNoData notFound={porfolioRows.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            // dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            // onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>

        {/* Add Export Button */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleExportAsImage}>
            Export Table as Image
          </Button>
        </Box>
      </DashboardContent>

      {/* {renderConfirmDialog()} */}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
