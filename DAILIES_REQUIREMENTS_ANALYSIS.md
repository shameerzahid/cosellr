# Dailies Module - Requirements Analysis

## 📋 Overview

This document provides a comprehensive analysis of the requirements for implementing the **Dailies Module** in the React frontend, based on the provided specification document.

---

## 🎯 Core Requirements Summary

### 1. **Module Purpose**
- Track and log **12 predefined daily operations** at:
  - **Portfolio level** (summary)
  - **ASIN level** (individual products nested under portfolios)
- Support both **automated logs** (system-generated) and **manual logs** (user-entered)

### 2. **Migration Context**
- **Current State:** Django template-based UI
- **Target State:** React-based UI
- **Critical:** Must preserve existing functionality and layout
- **Users:** Active users currently using the module - no breaking changes allowed

---

## 🏗️ Architecture & Component Structure

### **Required Components**

#### 1. **PortfolioRow Component**
- Displays portfolio summary
- Shows checklist status for 12 items
- **Collapsible** - expands to show nested ASIN rows
- Click handler for expanding/collapsing

#### 2. **PortfolioCell Component**
- Individual cell within PortfolioRow
- Displays status indicator for each of the 12 checklist items
- Clickable to open drawer

#### 3. **AsinDailyRow Component**
- Nested row within expanded PortfolioRow
- Displays ASIN-level checklist status
- Shows 12-item checklist for individual products

#### 4. **AsinDailyCell Component**
- Individual cell within AsinDailyRow
- Displays status for each checklist item
- Clickable to open drawer

#### 5. **Status Component** (Reusable)
- Visual indicator for checklist states
- Must be consistent across portfolio and ASIN levels
- States likely include: Complete, Incomplete, Pending, etc.

#### 6. **Side Drawer Component** (Critical)
- **Slides in from the right** (not a modal/popup)
- Contains:
  - **Title/Header:** ASIN and Marketplace information
  - **History Section:** Read-only log history for selected checklist item
  - **Input Section:** Text box for new log entry
  - **Action Buttons:** Save and Cancel
- Must match current Django template modal behavior

---

## 📊 UI Layout Structure

### **Base Layout (Mid-Weekly Report Pattern)**

Following the mid-weekly report as the base:

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumbs: Dashboard > Dailies                       │
├─────────────────────────────────────────────────────────┤
│  [Search Bar]  [Filters]  [Dropdown]  [Three-dot Menu]  │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐  │
│  │ Portfolio | Item1 | Item2 | ... | Item12 | Actions│  │
│  ├───────────────────────────────────────────────────┤  │
│  │ ▼ Portfolio A    | ✓ | ✗ | ✓ | ... | ✓ | [⋮]    │  │
│  │   ├─ ASIN-001    | ✓ | ✓ | ✗ | ... | ✓ | [⋮]    │  │
│  │   ├─ ASIN-002    | ✗ | ✓ | ✓ | ... | ✓ | [⋮]    │  │
│  │   └─ ASIN-003    | ✓ | ✗ | ✓ | ... | ✗ | [⋮]    │  │
│  │ ▶ Portfolio B    | ✓ | ✓ | ✓ | ... | ✓ | [⋮]    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### **Collapsible Row Behavior**
- **Portfolio rows** are expandable/collapsible
- **Expanded state** shows nested ASIN rows
- **Collapsed state** shows only portfolio summary
- Use MUI Table with Collapse component or custom implementation

### **Drawer Behavior**
- Opens when clicking any checklist cell (Portfolio or ASIN level)
- Slides from right side
- Width: ~400-500px (standard drawer width)
- Backdrop: Semi-transparent overlay
- Close: Click outside, Cancel button, or X icon

---

## 🔌 API Integration Requirements

### **Base URL Configuration**
- Uses `CONFIG.serverUrl` from `src/global-config.js`
- Currently: `VITE_SERVER_URL` environment variable

### **API Endpoints**

#### 1. **Initial Data Load**
```
GET /dailies/api/portfolio-dailies-with-asins/
```
- **Purpose:** Fetch all portfolios with nested ASINs and current checklist statuses
- **Response:** Hierarchical data structure
- **When:** On component mount
- **Loading:** Show loading indicator

#### 2. **ASIN Daily Logs - History**
```
GET /dailies/api/asindaily-log/[asinDailyId]/[checkElement]/history/
```
- **Purpose:** Fetch historical logs for a specific ASIN checklist item
- **Parameters:**
  - `asinDailyId`: ID of the ASIN daily record
  - `checkElement`: Which of the 12 checklist items (1-12)
- **When:** When drawer opens for ASIN-level cell
- **Response:** Array of log entries with timestamps

#### 3. **ASIN Daily Logs - Save**
```
POST /dailies/api/asindaily-log/[asinDailyId]/[checkElement]/save/
```
- **Purpose:** Save new log entry for ASIN checklist item
- **Body:**
  ```json
  {
    "log": "Your test log here",
    "status_val": "OK"
  }
  ```
- **When:** User clicks Save in drawer
- **Response:** Success/error confirmation

#### 4. **Portfolio Daily Logs - History**
```
GET /dailies/api/portfoliodaily-log/[portfoliodailyId]/[checkElement]/history/
```
- **Purpose:** Fetch historical logs for portfolio checklist item
- **Parameters:**
  - `portfoliodailyId`: ID of the portfolio daily record
  - `checkElement`: Which of the 12 checklist items (1-12)
- **When:** When drawer opens for portfolio-level cell
- **Response:** Array of log entries

#### 5. **Portfolio Daily Logs - Save**
```
POST /dailies/api/portfoliodaily-log/[portfoliodailyId]/[checkElement]/save/
```
- **Purpose:** Save new log entry for portfolio checklist item
- **Body:**
  ```json
  {
    "log": "Your test log here"
  }
  ```
- **Note:** Portfolio status cannot be changed (inherited from ASINs)
- **When:** User clicks Save in drawer

### **API Service Structure**

Following existing pattern (`src/actions/reportService.js`):

```javascript
// src/actions/dailiesService.js

export const fetchPortfolioDailiesWithAsins = async () => {
  const url = `${endpoints.dailies.portfolioDailiesWithAsins}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const fetchAsinDailyLogHistory = async (asinDailyId, checkElement) => {
  const url = `${endpoints.dailies.asinDailyLogHistory(asinDailyId, checkElement)}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const saveAsinDailyLog = async (asinDailyId, checkElement, logData) => {
  const url = `${endpoints.dailies.asinDailyLogSave(asinDailyId, checkElement)}`;
  const response = await axiosInstance.post(url, logData);
  return response.data;
};

// Similar for portfolio logs...
```

### **Custom Hooks Pattern**

Following `useWeeklyReport.js` pattern:

```javascript
// src/hooks/useDailies.js

export const useDailies = () => {
  const { data, error, isLoading } = useSWR(
    '/dailies/api/portfolio-dailies-with-asins/',
    fetchPortfolioDailiesWithAsins
  );
  return { data, isLoading, error };
};
```

---

## 🎨 Design System & Styling

### **Base Template Reference**
- **Mid-Weekly Report:** `src/sections/reports/view/midweekly-report-view.jsx`
- **Components to Reuse:**
  - `CustomBreadcrumbs`
  - `UserTableToolbar` (search, filters)
  - `Table`, `TableRow`, `TableCell` from MUI
  - `Scrollbar` component
  - `Card` wrapper
  - `DashboardContent` layout

### **MUI Components Reference**
- **Collapsible Table:** https://minimals.cc/components/mui/table
- **Drawer:** https://minimals.cc/components/mui/drawer
- **Buttons:** https://minimals.cc/components/mui/buttons
- **Icons:** https://minimals.cc/components/foundation/icons#local-icons

### **Existing Drawer Examples**
- `src/components/settings/drawer/settings-drawer.jsx` - Right-side drawer
- `src/layouts/components/account-drawer.jsx` - User account drawer
- `src/layouts/components/notifications-drawer/index.jsx` - Notifications drawer

### **Styling Guidelines**
- Use `varAlpha()` for transparency
- Use theme variables for colors
- Maintain consistent spacing (theme.spacing)
- Responsive design (xs, sm, md, lg breakpoints)
- Dark/light mode support (automatic via theme)

---

## 📁 File Structure Plan

```
src/
├── actions/
│   └── dailiesService.js          # API service functions
├── hooks/
│   └── useDailies.js              # Custom hooks for data fetching
├── sections/
│   └── dailies/
│       ├── components/
│       │   ├── portfolio-row.jsx          # Portfolio row component
│       │   ├── portfolio-cell.jsx         # Portfolio cell component
│       │   ├── asin-daily-row.jsx         # ASIN row component
│       │   ├── asin-daily-cell.jsx        # ASIN cell component
│       │   ├── status-indicator.jsx       # Reusable status component
│       │   └── dailies-drawer.jsx         # Side drawer component
│       ├── view/
│       │   ├── index.js
│       │   └── dailies-list-view.jsx       # Main view component
│       └── dailies-table-toolbar.jsx      # Toolbar (search, filters)
├── pages/
│   └── dashboard/
│       └── dailies/
│           └── list.jsx                   # Page component (already created)
└── lib/
    └── axios.js                            # Update endpoints
```

---

## 🔄 Data Flow & State Management

### **Component Hierarchy**
```
DailiesListView
  ├── DailiesTableToolbar (search, filters)
  ├── Table
  │   ├── TableHead (12 checklist columns + portfolio)
  │   └── TableBody
  │       ├── PortfolioRow (collapsible)
  │       │   ├── PortfolioCell × 12
  │       │   └── Collapse (when expanded)
  │       │       └── AsinDailyRow × N
  │       │           └── AsinDailyCell × 12
  └── DailiesDrawer (conditionally rendered)
      ├── Header (ASIN/Marketplace info)
      ├── History List (read-only)
      ├── Input TextField
      └── Action Buttons (Save, Cancel)
```

### **State Management**
- **Local State:** Use `useState` for:
  - Expanded portfolio rows
  - Drawer open/close
  - Selected cell (which checklist item)
  - Form input (new log text)
  - Loading states

- **Data Fetching:** Use `useSWR` for:
  - Initial portfolio/ASIN data
  - History logs (when drawer opens)
  - Optimistic updates after save

- **Form State:** Use `react-hook-form` (if complex validation needed) or simple `useState`

---

## ✅ Implementation Checklist

### **Phase 1: Foundation**
- [ ] Update `src/lib/axios.js` with dailies endpoints
- [ ] Create `src/actions/dailiesService.js` with API functions
- [ ] Create `src/hooks/useDailies.js` custom hook
- [ ] Set up basic `DailiesListView` structure

### **Phase 2: Table Structure**
- [ ] Create `PortfolioRow` component (non-collapsible first)
- [ ] Create `PortfolioCell` component (12 cells)
- [ ] Create `StatusIndicator` reusable component
- [ ] Implement table with portfolio rows only

### **Phase 3: Collapsible Functionality**
- [ ] Add expand/collapse state management
- [ ] Implement `AsinDailyRow` component
- [ ] Implement `AsinDailyCell` component
- [ ] Add nested rows when portfolio expanded
- [ ] Test collapsible behavior

### **Phase 4: Drawer Implementation**
- [ ] Create `DailiesDrawer` component
- [ ] Implement drawer open/close logic
- [ ] Add API calls for history logs
- [ ] Display history in drawer
- [ ] Add input field for new log
- [ ] Implement Save functionality
- [ ] Add error handling and loading states

### **Phase 5: Integration & Polish**
- [ ] Add toolbar (search, filters) - reuse from mid-weekly
- [ ] Add loading indicators
- [ ] Add error handling
- [ ] Test all API endpoints
- [ ] Responsive design testing
- [ ] Dark/light mode testing
- [ ] Accessibility checks

### **Phase 6: Testing & Deployment**
- [ ] Test with real API endpoints
- [ ] Verify all 12 checklist items work
- [ ] Test portfolio and ASIN level interactions
- [ ] Deploy to Vercel for review
- [ ] Document API integration
- [ ] Create setup instructions

---

## 🚨 Critical Considerations

### **1. Backward Compatibility**
- Must match existing Django template behavior
- Users should not notice functional differences
- Layout should be similar (improved, not changed)

### **2. Performance**
- Large datasets (many portfolios/ASINs)
- Lazy load history logs (only when drawer opens)
- Use SWR caching for API calls
- Optimize re-renders with React.memo if needed

### **3. Error Handling**
- Network errors
- API errors (400, 500, etc.)
- Empty states
- Loading states

### **4. User Experience**
- Smooth animations for drawer
- Clear visual feedback for actions
- Loading indicators
- Success/error notifications (toast)

### **5. The 12 Checklist Items**
- Need to understand what each item represents
- May need labels/descriptions
- Status indicators must be clear
- Consider tooltips for clarity

---

## 📝 Notes & Questions

### **Clarifications Needed:**
1. What are the **12 predefined daily operations**? (Names, descriptions)
2. What are the **status values**? (OK, Pending, Failed, etc.)
3. What does **"status_val": "OK"** mean in ASIN save API?
4. How is **portfolio status inherited** from ASINs? (Logic to implement)
5. What is the **data structure** of the initial API response?
6. Are there **filters/search** requirements? (Portfolio name, ASIN, date range?)
7. Should there be **date selection**? (Today's dailies vs historical)
8. What are the **automated logs** vs **manual logs**? (Visual distinction?)

### **Assumptions:**
- 12 checklist items are consistent across all portfolios/ASINs
- Status can be: Complete/Incomplete or similar binary states
- Drawer width: ~400-500px (standard)
- History logs show: timestamp, log text, user (if applicable)
- Portfolio status is calculated from nested ASIN statuses

---

## 🎯 Success Criteria

✅ **Functional:**
- All 12 checklist items display correctly
- Portfolio rows expand/collapse smoothly
- ASIN rows display when portfolio expanded
- Drawer opens on cell click
- History logs fetch and display
- New logs can be saved
- API integration works end-to-end

✅ **Visual:**
- Matches mid-weekly report layout style
- Consistent with existing design system
- Responsive on all screen sizes
- Dark/light mode support

✅ **Technical:**
- Clean, maintainable code
- Reusable components
- Proper error handling
- Loading states
- No console errors
- Production-ready

---

**End of Analysis Document**

