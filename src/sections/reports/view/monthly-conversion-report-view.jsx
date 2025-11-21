import { useBoolean } from 'minimal-shared/hooks';
import { useEffect, useCallback, useState } from 'react';

import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DashboardContent } from 'src/layouts/dashboard';

import { MonthlyConversionNav } from '../components/monthly-conversion-nav';
import { MonthlyConversionLayout } from '../components/monthly-conversion-layout';
import { MonthlyConversionList } from '../components/monthly-conversion-list';
import { MonthlyConversionHeader } from '../components/monthly-conversion-header';
import { MonthlyConversionDetails } from '../components/monthly-conversion-details';

// ----------------------------------------------------------------------

export function MonthlyConversionReportView() {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [selectedLabelId, setSelectedLabelId] = useState(); // Track selected button
  const selectedProductId = ''; // Static fallback value

  const openNav = useBoolean();

  // Use for the porfolios
  const potfolios = [
    { id: 'inbox', name: 'UK' },
    { id: 'sent', name: 'France' },
    { id: 'drafts', name: 'Kits-US' },
  ];

  // used for the products
  const products = {
    allIds: ['1', '2', '3', '4'],
    byId: {
      // 1: { id: '1', subject: 'Dummy Mail 1', content: 'This is a dummy email.' },
      1: { id: '1', name: 'SS', content: 'Sun Shades' },
      2: { id: '2', name: '1PC', content: '1 Peace' },
      3: { id: '3', name: '2PC', content: '2 Peaces' },
      4: { id: '4', name: 'WS', content: 'Wind Shields' },
    },
  };

  const handleClickLabel = useCallback(
    (labelId) => {
      setSelectedLabelId(labelId); // Update selected button

      if (!mdUp) {
        openNav.onFalse();
      }

      // Code executed when portfolio button clicked
      console.log('Portfolio button clicked:', labelId);
    },
    [mdUp, openNav]
  );

  return (
    <>
      <DashboardContent
        maxWidth={false}
        sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Monthly Conversion Report
        </Typography>

        {/* just used for layouting */}
        <MonthlyConversionLayout
          sx={{
            p: 1,
            borderRadius: 2,
            flex: '1 1 auto',
            bgcolor: 'background.neutral',
          }}
          slots={{
            // __________ Load portfolios
            nav: (
              <MonthlyConversionNav
                labels={potfolios}
                selectedLabelId={selectedLabelId} // Highlight selected potfolio
                onClickLabel={handleClickLabel}
              />
            ),
            // __________ Load products
            list: <MonthlyConversionList products={products} selectedMailId={selectedProductId} />,
            // __________ Load metrics
            details: <MonthlyConversionDetails />,
          }}
        />
      </DashboardContent>
    </>
  );
}
