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
import { useMidWeeklyReport } from 'src/hooks/useMidWeeklyReport'; // API Service FETCH
import { MidweeklyReportRow } from '../midweekly-report-row';
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

// Function to calculate the Sunday of a given date
function getSunday(date) {
  const d = new Date(date);
  const day = d.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
  const diff = d.getDate() - day; // Calculate the difference to get back to Sunday
  d.setDate(diff);
  return d;
}

// Determine the startDate
let startDate;
if (dateParam) {
  const parsedDate = new Date(dateParam);
  if (!isNaN(parsedDate)) {
    // If the date parameter is valid, calculate the Sunday of that week
    startDate = getSunday(parsedDate).toISOString().split('T')[0];
  } else {
    // If the date parameter is invalid, default to the Sunday of the current week
    startDate = getSunday(new Date()).toISOString().split('T')[0];
  }
} else {
  // If no date parameter is provided, default to the Sunday of the current week
  startDate = getSunday(new Date()).toISOString().split('T')[0];
}

// Debugging logs
console.log("Today's Date:", new Date().toISOString().split('T')[0]); // Log today's date
console.log('Start Date (Sunday):', startDate); // Log the calculated start date

// set first day of the week here
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// concatenate with date
const weekHeaders = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(new Date(startDate).getDate() + i);
  return {
    id: dayNames[i].toLowerCase(),
    label: (
      <>
        {dayNames[i]}
        <br />
        <span style={{ fontWeight: 400 }}>
          {date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
          })}
        </span>
      </>
    ),
  };
});

const TABLE_HEAD = [
  { id: 'portfolio', label: 'Portfolio', width: 80 },
  ...weekHeaders.map((header) => ({ ...header, width: 50 })), // Fixed width for week columns
  { id: 'thisWeek', label: 'This Week', width: 120 },
  { id: 'lastWeek', label: 'Last Week', width: 120 },
  { id: 'history', label: 'History', width: 120 },
];

// visibility
const initialVisibleColumns = {
  portfolio: true,
  sunday: true,
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  thisWeek: true,
  lastWeek: true,
  history: true,
};

// ----------------------------------------------------------------------

export function MidweeklyReportView() {
  const table = useTable();
  const confirmDialog = useBoolean();
  const [tableData, setTableData] = useState([]); // Initialize with an empty array
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);
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

  const { data, isLoading, error } = useMidWeeklyReport(startDate);

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

  const portfolios = data?.portfolios || []; // Removed filtering logic

  return (
    <>
      <DashboardContent maxWidth="xxl">
        <CustomBreadcrumbs
          heading="Mid-Weekly Report"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Report', href: paths.dashboard.reports.root },
            { name: 'Mid-Weekly Report' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Weekday Checkboxes */}
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              {Object.keys(visibleColumns).map((key) => (
                <FormControlLabel
                  key={key}
                  value={key}
                  label={key}
                  labelPlacement="top" // Place the label at the top
                  control={
                    <Checkbox
                      size="medium"
                      checked={visibleColumns[key]}
                      disabled={['portfolio', 'thisWeek', 'lastWeek', 'history'].includes(key)} // Disable specific checkboxes
                      onChange={() => setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }))}
                      slotProps={{
                        input: {
                          id: `${key}-checkbox`,
                          'aria-label': `${key} checkbox`,
                        },
                      }}
                    />
                  }
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Metric Cell Documentation */}
          <Box sx={{ width: 250 }}>
            {' '}
            {/* Fixed width for the MetricTableCell */}
            <MetricTableCell
              totalSales="Total Sales"
              tacos="5"
              ppcSales="PPC Sales"
              ppcSpend="Spend"
              acos="ACos"
              tacosTarget={null} // Not needed for documentation
              isSummary // Optional, for styling
              isDocumentation
            />
          </Box>
        </Box>

        <Card
        // sx={{
        //   border: '1px solid',
        //   borderColor: 'grey.300', // or theme.palette.divider if you're using custom themes
        // }}
        >
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tabs
              value={currentFilters.status}
              sx={[
                (theme) => ({
                  px: 2.5,
                  boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                }),
              ]}
            >
              {STATUS_OPTIONS.map((tab) => (
                <Tab
                  key={tab.value}
                  iconPosition="end"
                  value={tab.value}
                  label={tab.label}
                  icon={
                    <Label
                      variant={
                        ((tab.value === 'all' || tab.value === currentFilters.status) &&
                          'filled') ||
                        'soft'
                      }
                      color={
                        (tab.value === 'onTarget' && 'success') ||
                        (tab.value === 'close' && 'warning') ||
                        (tab.value === 'offTarget' && 'error') ||
                        (tab.value === 'paused' && 'default') ||
                        'default'
                      }
                    >
                      {['onTarget', 'close', 'offTarget', 'paused'].includes(tab.value)
                        ? tableData.filter((user) => user.status === tab.value).length
                        : tableData.length}
                    </Label>
                  }
                />
              ))}
            </Tabs>
          </Box> */}

          <UserTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: _roles }}
            setVisibleColumns={(newCols) => {
              setVisibleColumns(newCols);
            }}
          />

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
            {/* <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirmDialog.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            /> */}

            <Scrollbar>
              <Table size="medium" sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD.filter((col) => visibleColumns[col.id])}
                  rowCount={portfolios.length}
                  numSelected={table.selected.length}
                  centered
                />

                <TableBody>
                  {portfolios.map((portfolio) => (
                    <MidweeklyReportRow
                      key={portfolio.portfolio_name} // Use portfolio_name as the unique identifier
                      row={portfolio} // Pass the entire portfolio object
                      visibleColumns={visibleColumns}
                      selected={table.selected.includes(portfolio.portfolio_name)}
                      onSelectRow={() => table.onSelectRow(portfolio.portfolio_name)}
                      onDeleteRow={() => handleDeleteRow(portfolio.portfolio_name)}
                    />
                  ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, portfolios.length)}
                  />

                  <TableNoData notFound={portfolios.length === 0} />
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
