import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function MonthlyConversionNavItem({ selected, label, onClickNavItem, ...other }) {
  return (
    <Box component="li" sx={{ display: 'flex' }}>
      <ListItemButton
        disableGutters
        onClick={onClickNavItem}
        sx={{
          pl: 1,
          pr: 1.5,
          gap: 2,
          borderRadius: 0.75,
          color: 'text.secondary',
          ...(selected && { color: 'text.primary', bgcolor: 'action.selected' }), // Highlight selected
        }}
        {...other}
      >
        <Iconify icon="solar:tag-horizontal-bold-duotone" width={22} sx={{ color: label.color }} />
        <Box
          component="span"
          sx={{
            flexGrow: 1,
            textTransform: 'capitalize',
            typography: selected ? 'subtitle2' : 'body2',
          }}
        >
          {label.name}
        </Box>
      </ListItemButton>
    </Box>
  );
}
