import { CONFIG } from 'src/global-config';

import { MidweeklyReportView } from 'src/sections/reports/view';

// ----------------------------------------------------------------------

const metadata = { title: `Mid-Weekly Report | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <MidweeklyReportView />
    </>
  );
}
