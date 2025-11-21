import { CONFIG } from 'src/global-config';

import { MonthlyConversionReportView } from 'src/sections/reports/view';

// ----------------------------------------------------------------------

const metadata = { title: `Monthly Conversion Report | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <MonthlyConversionReportView />
    </>
  );
}
