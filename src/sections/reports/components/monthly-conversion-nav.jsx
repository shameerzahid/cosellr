import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { MonthlyConversionNavItem } from './monthly-conversion-nav-item';
import { MonthlyConversionNavItemSkeleton } from './monthly-conversion-skeleton';

// ----------------------------------------------------------------------

export function MonthlyConversionNav({ loading, labels, onClickLabel, selectedLabelId }) {
  const renderLoading = () => (
    <Stack sx={{ flex: '1 1 auto', px: { xs: 2.5, md: 1.5 } }}>
      <MonthlyConversionNavItemSkeleton />
    </Stack>
  );

  const renderList = () => (
    <Scrollbar sx={{ flex: '1 1 0' }}>
      <nav>
        <Box component="ul" sx={{ pb: 1.5, px: { xs: 1.5, md: 0.5 } }}>
          {labels.map((label) => (
            <MonthlyConversionNavItem
              key={label.id}
              label={label}
              selected={selectedLabelId === label.id} // Highlight selected button
              onClickNavItem={() => onClickLabel(label.id)} // Handle click
            />
          ))}
        </Box>
      </nav>
    </Scrollbar>
  );

  const renderContent = () => (
    <>
      <Box sx={(theme) => ({ p: { xs: 2.5, md: theme.spacing(2, 1.5) } })}>
        <Stack sx={{ p: 2 }}>
          <Box
            component="span"
            sx={{
              flexGrow: 1,
              textTransform: 'capitalize',
              typography: 'body1',
              fontWeight: 'bold',
            }}
          >
            Portfolios
          </Box>
        </Stack>
      </Box>

      {loading ? renderLoading() : renderList()}
    </>
  );

  return <>{renderContent()}</>;
}
