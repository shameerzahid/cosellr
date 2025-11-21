import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { MonthlyConversionItem } from './monthly-conversion-item';

// ----------------------------------------------------------------------

// ---------------------------------------------------
// Products Column : Sun Shades | 1 PC | 2 PC
// ---------------------------------------------------

export function MonthlyConversionList({ products, onClickMail, selectedProductId }) {
  // const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  // State to track the currently selected item
  const [selectedItemId, setSelectedItemId] = useState(selectedProductId);

  const handleItemClick = (mailId) => {
    setSelectedItemId(mailId); // Update the selected item
    onClickMail(mailId); // Trigger the onClickMail callback
  };

  const renderList = () => (
    <Scrollbar sx={{ flex: '1 1 0' }}>
      <nav>
        <Box
          component="ul"
          sx={{
            px: 2,
            pb: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {products.allIds.map((mailId) => (
            <MonthlyConversionItem
              key={mailId}
              selected={selectedItemId === mailId} // Highlight the selected button
              onClick={() => handleItemClick(mailId)} // Handle click
            />
          ))}
        </Box>
      </nav>
    </Scrollbar>
  );

  const renderContent = () => (
    <>
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
          Products
        </Box>
        {/* {mdUp ? (
          <TextField
            placeholder="Search..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        ) : (
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {selectedLabelId}
          </Typography>
        )} */}
      </Stack>

      {renderList()}
    </>
  );

  return <>{renderContent()}</>;
}
