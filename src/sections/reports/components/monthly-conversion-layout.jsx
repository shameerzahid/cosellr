import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function MonthlyConversionLayout({ slots, slotProps, sx, ...other }) {
  return (
    <LayoutRoot sx={sx} {...other}>
      {slots.header}

      <LayoutContainer {...slotProps?.container}>
        {/* navigation side menu */}
        <LayoutNav {...slotProps?.nav}>{slots.nav}</LayoutNav>

        {/* second column */}
        <LayoutList {...slotProps?.list}>{slots.list}</LayoutList>

        {/* third column */}
        <LayoutDetails {...slotProps?.details}>{slots.details}</LayoutDetails>
      </LayoutContainer>
    </LayoutRoot>
  );
}

// ----------------------------------------------------------------------

const LayoutRoot = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const LayoutContainer = styled('div')(({ theme }) => ({
  gap: theme.spacing(1),
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
}));

const LayoutNav = styled('div')(({ theme }) => ({
  display: 'none',
  flex: '0 0 200px',
  overflow: 'hidden',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: { display: 'flex' },
}));

const LayoutList = styled('div')(({ theme }) => ({
  display: 'none',
  flex: '0 0 320px',
  overflow: 'hidden',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.vars.palette.background.default,
  [theme.breakpoints.up('md')]: { display: 'flex' },
}));

const LayoutDetails = styled('div')(({ theme }) => ({
  minWidth: 0,
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.vars.palette.background.default,
}));
