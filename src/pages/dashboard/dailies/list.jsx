import { CONFIG } from 'src/global-config';

import { DailiesListView } from 'src/sections/dailies/view';

// ----------------------------------------------------------------------

const metadata = { title: `Dailies | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <DailiesListView />
    </>
  );
}

