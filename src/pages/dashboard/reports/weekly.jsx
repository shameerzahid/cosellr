import { CONFIG } from 'src/global-config';

import { WeeklyReportView } from 'src/sections/reports/view';

// ----------------------------------------------------------------------

const metadata = { title: `Weekly Report | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <WeeklyReportView />
    </>
  );
}
