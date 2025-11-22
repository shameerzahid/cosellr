import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));

// Lazy loading the pages : Group menu
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

// loading profile for now
// const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserListPage = lazy(() => import('src/pages/dashboard/reports/list'));
const MidweeklyPage = lazy(() => import('src/pages/dashboard/reports/midweekly')); // Get Page
const WeeklyPage = lazy(() => import('src/pages/dashboard/reports/weekly')); // Get Page
const MonthlyConversionPage = lazy(() => import('src/pages/dashboard/reports/monthlyConversion')); // Get Page

// Dailies pages
const DailiesListPage = lazy(() => import('src/pages/dashboard/dailies/list'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
      {
        path: 'reports',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'midweekly', element: <MidweeklyPage /> },
          { path: 'weekly', element: <WeeklyPage /> },
          { path: 'monthlyConversion', element: <MonthlyConversionPage /> },
        ],
      },
      {
        path: 'dailies',
        children: [
          { path: 'list', element: <DailiesListPage /> },
          { element: <DailiesListPage />, index: true },
        ],
      },
    ],
  },
];
