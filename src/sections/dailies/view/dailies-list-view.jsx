import { useState, useEffect } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { toast } from 'src/components/snackbar';
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { useDailies } from 'src/hooks/useDailies';
import { usePortfolioDailyLogHistory } from 'src/hooks/usePortfolioDailyLogHistory';
import { useAsinDailyLogHistory } from 'src/hooks/useAsinDailyLogHistory';
import { savePortfolioDailyLog, saveAsinDailyLog } from 'src/actions/dailiesService';
import { PortfolioRow } from '../components/portfolio-row';
import { DailiesDrawer } from '../components/dailies-drawer';
import { CHECKLIST_FIELDS } from '../components/checklist-fields';

// ----------------------------------------------------------------------

// Table header configuration
const TABLE_HEAD = [
  { id: 'portfolio', label: 'Portfolio', width: 150 },
  ...CHECKLIST_FIELDS.map((field) => ({
    id: field.id,
    label: field.label,
    width: 100,
  })),
];

// ----------------------------------------------------------------------

export function DailiesListView() {
  const table = useTable();
  const { data: initialPortfolios, isLoading, error, mutate: mutatePortfolios } = useDailies();

  // Local state for portfolios (allows updates after save)
  const [portfolios, setPortfolios] = useState([]);

  // Sync local state with SWR data
  useEffect(() => {
    if (initialPortfolios.length > 0) {
      setPortfolios(initialPortfolios);
    }
  }, [initialPortfolios]);

  // Drawer state
  const drawerOpen = useBoolean(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch portfolio history when drawer is open and portfolio item is selected
  const {
    history: portfolioHistory,
    isLoading: isLoadingPortfolioHistory,
    error: portfolioHistoryError,
  } = usePortfolioDailyLogHistory(
    selectedItem?.portfolioDailyId || null,
    selectedItem?.field || null,
    drawerOpen.value && selectedItem?.type === 'portfolio'
  );

  // Fetch ASIN history when drawer is open and ASIN item is selected
  const {
    history: asinHistory,
    isLoading: isLoadingAsinHistory,
    error: asinHistoryError,
  } = useAsinDailyLogHistory(
    selectedItem?.asinDailyId || null,
    selectedItem?.field || null,
    drawerOpen.value && selectedItem?.type === 'asin'
  );

  // Determine which history to use based on selected item type
  const history = selectedItem?.type === 'portfolio' ? portfolioHistory : asinHistory;
  const isLoadingHistory =
    selectedItem?.type === 'portfolio' ? isLoadingPortfolioHistory : isLoadingAsinHistory;
  const historyError =
    selectedItem?.type === 'portfolio' ? portfolioHistoryError : asinHistoryError;

  // Handler for when a checklist item is clicked
  const handleChecklistItemClick = (itemData) => {
    setSelectedItem(itemData);
    drawerOpen.onTrue();
  };

  // Handler for closing drawer
  const handleCloseDrawer = () => {
    drawerOpen.onFalse();
    // Clear selected item after a short delay to allow drawer close animation
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  };

  // Handler for saving new log
  const handleSaveLog = async (logText) => {
    if (!selectedItem || !logText.trim()) {
      return;
    }

    setIsSaving(true);

    try {
      if (selectedItem.type === 'portfolio') {
        // Save portfolio log
        const response = await savePortfolioDailyLog(
          selectedItem.portfolioDailyId,
          selectedItem.field,
          logText
        );

        // Response is the updated Portfolio Dailies object
        // Update the portfolio in the list
        setPortfolios((prev) =>
          prev.map((portfolio) =>
            portfolio.id === selectedItem.portfolioDailyId ? response : portfolio
          )
        );

        // Also update SWR cache - handle both array and wrapped responses
        mutatePortfolios(
          (current) => {
            if (Array.isArray(current)) {
              return current.map((portfolio) =>
                portfolio.id === selectedItem.portfolioDailyId ? response : portfolio
              );
            }
            if (current?.portfolio_dailies_without_asins) {
              const updated = current.portfolio_dailies_without_asins.map((portfolio) =>
                portfolio.id === selectedItem.portfolioDailyId ? response : portfolio
              );
              return { ...current, portfolio_dailies_without_asins: updated };
            }
            return current;
          },
          { revalidate: false }
        );

        toast.success('Log saved successfully');
      } else if (selectedItem.type === 'asin') {
        // Save ASIN log
        // Use the current status value passed from the ASIN row
        const status = selectedItem.currentStatus || '1';

        const response = await saveAsinDailyLog(
          selectedItem.asinDailyId,
          selectedItem.field,
          logText,
          status
        );

        // Response contains the parent Portfolio Dailies object (may include nested ASINs)
        // Update the portfolio in the list - extra fields like nested ASINs are ignored in main list
        setPortfolios((prev) =>
          prev.map((portfolio) =>
            portfolio.id === response.id ? response : portfolio
          )
        );

        // Also update SWR cache - handle both array and wrapped responses
        mutatePortfolios(
          (current) => {
            if (Array.isArray(current)) {
              return current.map((portfolio) =>
                portfolio.id === response.id ? response : portfolio
              );
            }
            if (current?.portfolio_dailies_without_asins) {
              const updated = current.portfolio_dailies_without_asins.map((portfolio) =>
                portfolio.id === response.id ? response : portfolio
              );
              return { ...current, portfolio_dailies_without_asins: updated };
            }
            return current;
          },
          { revalidate: false }
        );

        toast.success('Log saved successfully');
      }

      // Close drawer after successful save
      handleCloseDrawer();
    } catch (saveError) {
      console.error('Failed to save log:', saveError);
      toast.error(saveError?.message || 'Failed to save log. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderHeader = () => (
    <CustomBreadcrumbs
      heading="Daily Checks"
      links={[
        {
          name: 'Dashboard',
          href: paths.dashboard.root,
        },
        {
          name: 'Daily Checks',
          href: paths.dashboard.dailies.root,
        },
        { name: 'List' },
      ]}
      sx={{ mb: { xs: 3, md: 5 } }}
    />
  );

  const renderLoading = () => <LoadingScreen />;

  const renderError = () => (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="body2" sx={{ color: 'error.main' }}>
        Error loading dailies: {error?.message || 'Unknown error'}
      </Typography>
    </Box>
  );

  const renderTable = () => (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: (theme) => theme.customShadows.card,
        overflow: 'hidden',
      }}
    >
      <Scrollbar>
        <Table size="medium" sx={{ minWidth: 960 }}>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headCells={TABLE_HEAD}
            rowCount={portfolios.length}
            numSelected={table.selected.length}
          />

          <TableBody>
            {portfolios.map((portfolio) => (
              <PortfolioRow
                key={portfolio.id}
                portfolio={portfolio}
                onChecklistItemClick={handleChecklistItemClick}
              />
            ))}

            <TableNoData notFound={portfolios.length === 0} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={portfolios.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onRowsPerPage}
      />
    </Card>
  );

  if (isLoading) {
    return (
      <DashboardContent maxWidth="xxl">
        {renderHeader()}
        {renderLoading()}
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent maxWidth="xxl">
        {renderHeader()}
        {renderError()}
      </DashboardContent>
    );
  }

  return (
    <>
      <DashboardContent maxWidth="xxl">
        {renderHeader()}
        {renderTable()}
      </DashboardContent>

      {/* Side Drawer for History */}
      <DailiesDrawer
        open={drawerOpen.value}
        onClose={handleCloseDrawer}
        selectedItem={selectedItem}
        history={history}
        isLoading={isLoadingHistory}
        error={historyError}
        onSave={handleSaveLog}
        isSaving={isSaving}
      />
    </>
  );
}
