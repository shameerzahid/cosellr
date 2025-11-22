# Project Review: Cosellr Frontend

## 📋 Project Overview

**Project Name:** BRUK App (Cosellr Frontend)  
**Framework:** React 19.1.0 with Vite 6.2.3  
**UI Library:** Material-UI (MUI) v7  
**Template Base:** Minimal Dashboard Template (v7.0.0)

---

## 🛠️ Technology Stack

### Core Technologies
- **React:** 19.1.0 (latest)
- **Vite:** 6.2.3 (build tool)
- **React Router:** 7.4.1 (routing)
- **Material-UI (MUI):** 7.0.1 (UI components)
- **Emotion:** 11.14.0 (CSS-in-JS styling)

### State Management & Data Fetching
- **SWR:** 2.3.3 (data fetching with caching)
- **React Hook Form:** 7.55.0 (form management)
- **Zod:** 3.24.2 (schema validation)

### HTTP Client
- **Axios:** 1.8.4 (API requests)
- Base URL configured via `CONFIG.serverUrl` (from `VITE_SERVER_URL` env var)

### Authentication
- **JWT-based authentication** (currently active)
- Supports multiple auth methods: JWT, Amplify, Firebase, Supabase, Auth0
- Session stored in `sessionStorage` with key `JWT_STORAGE_KEY`
- Auth endpoints:
  - Login: `/profiles/login/`
  - Me: `/profiles/me`

### Additional Libraries
- **Framer Motion:** 12.6.1 (animations)
- **i18next:** 25.2.1 (internationalization - 10 languages supported)
- **TipTap:** 2.11.6 (rich text editor)
- **Day.js:** 1.11.13 (date manipulation)
- **MUI X Data Grid:** 7.28.2 (advanced tables)
- **MUI X Date Pickers:** 7.28.2 (date selection)
- **html2canvas:** 1.4.1 (screenshot/export functionality)

---

## 📁 Project Structure

```
src/
├── actions/              # API service functions
│   └── reportService.js  # Report API calls
├── auth/                 # Authentication system
│   ├── context/          # Auth context providers
│   ├── guard/            # Route guards (AuthGuard, GuestGuard)
│   ├── hooks/            # Auth hooks
│   └── view/             # Auth pages
├── components/           # Reusable UI components
│   ├── animate/          # Animation components
│   ├── table/            # Table components
│   ├── hook-form/        # Form components
│   └── ...               # Many other component categories
├── hooks/                # Custom React hooks
│   ├── useWeeklyReport.js
│   └── useMidWeeklyReport.js
├── layouts/              # Layout components
│   ├── dashboard/        # Main dashboard layout
│   ├── auth-split/       # Auth page layout
│   └── simple/           # Simple layout
├── lib/                  # Third-party library configs
│   └── axios.js          # Axios instance with interceptors
├── locales/              # Internationalization
│   └── langs/            # Translation files (10 languages)
├── pages/                # Page components
│   ├── dashboard/        # Dashboard pages
│   │   └── reports/      # Report pages
│   └── auth/             # Auth pages
├── routes/               # Routing configuration
│   ├── paths.js          # Route path definitions
│   └── sections/         # Route sections
├── sections/             # Feature sections
│   ├── reports/          # Report components & views
│   └── user/             # User management
├── theme/                # MUI theme configuration
└── utils/                # Utility functions
```

---

## 🔐 Authentication Flow

1. **Auth Provider** (`src/auth/context/jwt/auth-provider.jsx`)
   - Checks `sessionStorage` for JWT token on mount
   - Validates token and fetches user profile from `/profiles/me`
   - Provides auth context to entire app

2. **Route Guards**
   - `AuthGuard`: Protects authenticated routes
   - `GuestGuard`: Protects public routes (login/signup)
   - `RoleBasedGuard`: Role-based access control

3. **Session Management**
   - Token stored in `sessionStorage`
   - Auto-refresh on page load
   - Logout clears session

---

## 🗺️ Routing Structure

### Main Routes
- `/dashboard` - Main dashboard (protected)
  - `/dashboard` - Overview page
  - `/dashboard/two` - Orders page
  - `/dashboard/three` - Metrics page
  - `/dashboard/group/*` - Group management
  - `/dashboard/reports/*` - Reports section

### Reports Routes
- `/dashboard/reports` - Summary
- `/dashboard/reports/list` - Report list
- `/dashboard/reports/midweekly` - Mid-weekly report
- `/dashboard/reports/weekly` - Weekly report
- `/dashboard/reports/monthlyConversion` - Monthly conversion report

### Features
- Lazy loading for all pages
- Suspense boundaries with loading screens
- Error boundaries for error handling

---

## 📊 Reports Feature

### API Endpoints
- **Mid-weekly:** `/api/reports/midweekly-portfolio-grouped-metrics/`
  - Query param: `start_date`
- **Weekly:** `/api/reports/weekly-portfolio-grouped-metrics/`
  - Query param: `week_start`

### Components
- `WeeklyReportView` - Weekly report display
- `MidweeklyReportView` - Mid-weekly report display
- `MonthlyConversionReportView` - Monthly conversion report
- `ReportListView` - List of all reports

### Data Fetching Pattern
- Uses **SWR** for data fetching with caching
- Custom hooks: `useWeeklyReport`, `useMidWeeklyReport`
- Service functions in `src/actions/reportService.js`

### Features
- Date filtering
- Export functionality (html2canvas)
- Column visibility toggles
- Table pagination and sorting

---

## 🎨 Theme & Styling

### Theme System
- MUI theme with custom configuration
- Dark/Light mode support
- System theme detection
- Theme stored in localStorage

### Layout Options
- **Vertical** - Sidebar navigation
- **Horizontal** - Top navigation
- **Mini** - Collapsed sidebar

### Customization
- Settings drawer for theme customization
- Multiple color schemes
- Font customization (DM Sans, Inter, Nunito Sans, Public Sans, Barlow)

---

## 🌐 Internationalization

- **i18next** with React integration
- **10 languages** supported
- Language detection from browser/localStorage
- Lazy-loaded translation files
- Language switcher in header

---

## 📦 Key Features

### 1. Dashboard Layout
- Responsive navigation (vertical/horizontal/mini)
- Header with search, notifications, account menu
- Breadcrumbs navigation
- Settings drawer

### 2. Data Tables
- MUI X Data Grid integration
- Custom table components with:
  - Sorting
  - Filtering
  - Pagination
  - Column visibility
  - Row selection
  - Export functionality

### 3. Forms
- React Hook Form integration
- Zod validation
- Custom form components
- File upload support

### 4. Rich Text Editor
- TipTap editor integration
- Markdown support
- Code highlighting

### 5. File Management
- File upload with drag & drop
- File thumbnail previews
- File type detection

---

## 🔧 Configuration

### Environment Variables (Required)
```env
VITE_SERVER_URL=          # API base URL
VITE_ASSETS_DIR=          # Assets directory path
VITE_MAPBOX_API_KEY=      # Optional: Mapbox key
VITE_FIREBASE_*           # Optional: Firebase config
VITE_AWS_AMPLIFY_*        # Optional: AWS Amplify config
VITE_AUTH0_*              # Optional: Auth0 config
VITE_SUPABASE_*           # Optional: Supabase config
```

### Global Config (`src/global-config.js`)
- App name: "BRUK App"
- Auth method: JWT
- Server URL from env var
- Multiple auth provider configs (not all active)

---

## 🚀 Development Setup

### Scripts
```bash
yarn dev          # Start dev server (port 3031)
yarn build        # Production build
yarn lint         # ESLint check
yarn lint:fix     # Fix linting issues
yarn fm:fix       # Format code with Prettier
```

### Port
- Development server: **3031**
- Preview server: **3031**

---

## 📝 Code Quality

### Linting
- ESLint 9.23.0 with flat config
- React hooks rules
- Import sorting
- Unused imports detection

### Formatting
- Prettier 3.5.3
- Consistent code style

### Type Safety
- JavaScript (not TypeScript)
- Zod for runtime validation

---

## 🎯 Current Implementation Status

### ✅ Implemented
- Authentication system (JWT)
- Dashboard layout with navigation
- Reports feature (weekly, mid-weekly, monthly)
- Data tables with filtering/sorting
- Theme system (dark/light)
- Internationalization
- Form handling
- File uploads
- Responsive design

### 🔄 Customized from Template
- Navigation menu structure
- Report routes and pages
- API integration for reports
- Custom report components

### 📌 Areas for Enhancement
1. **Error Handling:** Could add more comprehensive error boundaries
2. **Loading States:** Some areas could use better loading indicators
3. **TypeScript:** Consider migrating for better type safety
4. **Testing:** No test files visible (could add unit/integration tests)
5. **API Error Handling:** Could improve error messages and retry logic
6. **Documentation:** Could add more inline documentation

---

## 🔗 API Integration Pattern

### Current Pattern
```javascript
// Service function (src/actions/reportService.js)
export const fetchWeeklyPortfolioMetrics = async (startDate) => {
  const url = `${endpoints.reports.weeklyPortfolioMetrics}?week_start=${startDate}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

// Custom hook (src/hooks/useWeeklyReport.js)
export const useWeeklyReport = (startDate) => {
  const { data, error, isLoading } = useSWR(
    startDate ? `/api/reports/weekly-portfolio-metrics?start_date=${startDate}` : null,
    () => fetchWeeklyPortfolioMetrics(startDate)
  );
  return { data, isLoading, error };
};
```

### Endpoints Defined
- Auth: `/profiles/login/`, `/profiles/me`
- Reports: `/api/reports/midweekly-portfolio-grouped-metrics/`, `/api/reports/weekly-portfolio-grouped-metrics/`
- Mock endpoints: `/api/chat`, `/api/kanban`, `/api/calendar`, etc.

---

## 🎨 UI/UX Features

- **Animations:** Framer Motion for smooth transitions
- **Progress Bar:** NProgress for route transitions
- **Snackbar:** Toast notifications (Sonner)
- **Dialogs:** Custom dialog components
- **Popovers:** Custom popover components
- **Loading Screens:** Custom loading components
- **Empty States:** Custom empty state illustrations
- **Error Pages:** 404, 500, forbidden pages

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Responsive navigation (mobile drawer)
- Responsive tables
- Touch-friendly interactions

---

## 🔒 Security Considerations

- JWT tokens in sessionStorage
- Axios interceptors for error handling
- Route guards for protected routes
- CORS handled by backend
- No sensitive data in client code

---

## 📚 Dependencies Summary

**Total Dependencies:** ~40 production packages
**Key Categories:**
- UI Framework: MUI ecosystem
- Forms: React Hook Form + Zod
- Data Fetching: SWR + Axios
- Routing: React Router
- Styling: Emotion + MUI
- Animations: Framer Motion
- Internationalization: i18next
- Rich Text: TipTap
- Date Handling: Day.js
- Utilities: es-toolkit, minimal-shared

---

## 🎯 Next Steps Recommendations

1. **Environment Setup:** Create `.env.example` file
2. **API Documentation:** Document all API endpoints
3. **Error Handling:** Implement global error handler
4. **Testing:** Add unit tests for critical components
5. **Performance:** Add code splitting for large components
6. **Accessibility:** Audit and improve a11y
7. **Documentation:** Add JSDoc comments to functions
8. **State Management:** Consider if Redux/Zustand needed for complex state

---

## 📄 File Naming Conventions

- Components: `kebab-case.jsx`
- Hooks: `useCamelCase.js`
- Utils: `kebab-case.js`
- Pages: `kebab-case.jsx`
- Sections: `kebab-case.jsx`

---

## 🏗️ Architecture Patterns

1. **Component Composition:** Heavy use of composition
2. **Custom Hooks:** Business logic in hooks
3. **Service Layer:** API calls in service files
4. **Context API:** Auth and settings via context
5. **Lazy Loading:** Code splitting for routes
6. **Provider Pattern:** Multiple providers (Theme, Auth, Settings, i18n)

---

This project is a well-structured React dashboard application built on a solid foundation with modern best practices. The codebase is organized, uses modern React patterns, and has a comprehensive UI component library.

