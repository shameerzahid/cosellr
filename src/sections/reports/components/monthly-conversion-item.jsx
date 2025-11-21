import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// ---------------------------------------------------
// Product button : Sun Shades
// ---------------------------------------------------

export function MonthlyConversionItem({ selected, sx, ...other }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // Reset clicked state after 200ms
  };

  return (
    <Box component="li" sx={{ display: 'flex' }}>
      <ListItemButton
        disableGutters
        onClick={handleClick}
        sx={[
          {
            p: 1,
            gap: 2,
            borderRadius: 1,
            ...(selected && { bgcolor: 'action.selected' }),
            ...(clicked && { bgcolor: 'action.hover' }), // Temporary clicked effect
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Avatar>V3</Avatar>

        <ListItemText
          primary="Sun Shades"
          secondary="Kinder Fluff"
          slotProps={{
            primary: { noWrap: true },
            secondary: {
              noWrap: true,
              sx: {
                color: 'text.disabled',
                fontSize: 12,
                mb: 1.5,
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignSelf: 'stretch',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Typography
            noWrap
            variant="body2"
            component="span"
            sx={{ mb: 1.5, fontSize: 12, color: 'text.disabled' }}
          >
            text 1
          </Typography>
        </Box>
      </ListItemButton>
    </Box>
  );
}
