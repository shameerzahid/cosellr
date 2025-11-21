import { CONFIG } from 'src/global-config';

import { ReportListView } from 'src/sections/reports/view';

// ----------------------------------------------------------------------

const metadata = { title: `Report here| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ReportListView />
    </>
  );
}
