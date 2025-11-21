import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import { BasicTable } from './basic';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { darken, lighten, alpha as hexAlpha } from '@mui/material/styles';

import { fDateTime } from 'src/utils/format-time';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { Scrollbar } from 'src/components/scrollbar';
import { EmptyContent } from 'src/components/empty-content';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export function MonthlyConversionDetails({ error, loading }) {
  const showAttachments = useBoolean(true);
  const isStarred = useBoolean(false); // Static value
  const isImportant = useBoolean(false); // Static value

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <EmptyContent
        title={error}
        imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-email-disabled.svg`}
      />
    );
  }

  const renderHead = () => (
    <>
      <Box sx={{ gap: 1, flexGrow: 1, display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="span"
            sx={{
              flexGrow: 1,
              pr: 3,
              textTransform: 'capitalize',
              typography: 'body1',
              fontWeight: 'bold',
            }}
          >
            Upload Business Report Files :
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Upload 2022">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="span"
                sx={{
                  flexGrow: 1,
                  textTransform: 'capitalize',
                  typography: 'body2',
                }}
              >
                2022
              </Box>
              <IconButton>
                <Iconify icon="eva:cloud-upload-fill" />
              </IconButton>
            </Box>
          </Tooltip>

          <Tooltip title="Upload 2023">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="span"
                sx={{
                  flexGrow: 1,
                  textTransform: 'capitalize',
                  typography: 'body2',
                }}
              >
                2023
              </Box>
              <IconButton>
                <Iconify icon="eva:cloud-upload-fill" sx={{ color: 'success.main' }} />
              </IconButton>
            </Box>
          </Tooltip>

          <Tooltip title="Upload 2024">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="span"
                sx={{
                  flexGrow: 1,
                  textTransform: 'capitalize',
                  typography: 'body2',
                }}
              >
                2024
              </Box>
              <IconButton>
                <Iconify icon="eva:cloud-upload-fill" sx={{ color: 'success.main' }} />
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          color="warning"
          icon={<Iconify icon="eva:star-outline" />}
          checkedIcon={<Iconify icon="eva:star-fill" />}
          checked={isStarred.value} // Static value
          onChange={isStarred.onToggle}
          slotProps={{
            input: {
              id: 'starred-checkbox',
              'aria-label': 'Starred checkbox',
            },
          }}
        />
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>
    </>
  );

  const renderSubject = () => (
    <>
      <BasicTable />
    </>
  );

  return (
    <>
      <Box
        sx={{
          pl: 2,
          pr: 1,
          height: 56,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {renderHead()}
      </Box>

      {/* subject title */}
      <Box
        sx={[
          (theme) => ({
            p: 2,
            gap: 2,
            flexShrink: 0,
            display: 'flex',
            borderTop: `1px dashed ${theme.vars.palette.divider}`,
            borderBottom: `1px dashed ${theme.vars.palette.divider}`,
          }),
        ]}
      >
        {renderSubject()}
      </Box>
    </>
  );
}
