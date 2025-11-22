# Minimals.cc Usage in This Project

## ✅ Yes, This Project Uses Minimals.cc

This project is **heavily based on** the **Minimal Dashboard Template** from [minimals.cc](https://minimals.cc).

---

## 📦 Evidence

### 1. **Package Information**
```json
{
  "name": "@minimal-kit/starter-vite-js",
  "author": "Minimals",
  "version": "7.0.0",
  "description": "Vite Starter & JavaScript"
}
```

### 2. **Core Dependency: `minimal-shared`**
- **Package:** `minimal-shared@^1.0.7`
- **Usage:** Extensively used throughout the codebase (143+ imports)
- **Purpose:** Shared utilities, hooks, and helper functions from the Minimal template

### 3. **README References**
The README explicitly mentions:
- Mock server guide: `https://docs.minimals.cc/mock-server`
- Migration guide: `https://docs.minimals.cc/migrate-to-cra/`
- Starter version: `https://starter.minimals.cc/`
- Demo API: `https://api-dev-minimal-[version].vercel.app`

---

## 🔧 What `minimal-shared` Provides

### **Utilities (`minimal-shared/utils`)**
Used in **100+ files** for:
- `varAlpha()` - Color alpha/opacity utilities
- `mergeClasses()` - CSS class merging
- `createPaletteChannel()` - Theme palette creation
- `hexToRgbChannel()` - Color conversion
- `pxToRem()`, `remToPx()` - Unit conversion
- `setFont()` - Font configuration
- `getStorage()`, `setStorage()` - LocalStorage utilities
- `isExternalLink()`, `isActiveLink()` - Link utilities

### **Hooks (`minimal-shared/hooks`)**
Used in **40+ files** for:
- `useBoolean()` - Boolean state management
- `useSetState()` - State management
- `usePopover()` - Popover state
- `usePopoverHover()` - Hover popover
- `useLocalStorage()` - LocalStorage hook
- `useScrollOffsetTop()` - Scroll position tracking
- `useIsClient()` - Client-side detection

---

## 📍 Where It's Used

### **Theme System**
- `src/theme/core/**` - All theme components use `varAlpha`, `createPaletteChannel`
- Theme configuration relies on minimal-shared utilities

### **Layout Components**
- `src/layouts/**` - All layout components use minimal-shared
- Navigation, headers, drawers all depend on it

### **UI Components**
- `src/components/**` - Most components use minimal-shared utilities
- Tables, forms, uploads, editors, etc.

### **Sections**
- `src/sections/reports/**` - Report components use minimal-shared hooks
- `src/sections/user/**` - User management uses minimal-shared

### **Authentication**
- `src/auth/**` - Auth components use minimal-shared hooks

---

## 🎯 Template Version

- **Template:** Minimal Dashboard Template
- **Version:** 7.0.0
- **Variant:** Vite.js Starter (JavaScript)
- **Base:** `@minimal-kit/starter-vite-js`

---

## 🔄 Customizations Made

While based on the template, the project has been customized:

1. **Navigation Menu** - Customized in:
   - `src/layouts/nav-config-dashboard.jsx`
   - `src/routes/paths.js`
   - `src/routes/sections/dashboard.jsx`

2. **Reports Feature** - Custom implementation:
   - Weekly, Mid-weekly, Monthly reports
   - Custom API integration
   - Custom report components

3. **App Name** - Changed to "BRUK App" in `src/global-config.js`

4. **API Integration** - Custom endpoints:
   - `/profiles/login/`
   - `/profiles/me`
   - `/api/reports/*`

---

## 📚 Documentation Links

- **Main Site:** https://minimals.cc
- **Starter Version:** https://starter.minimals.cc/
- **Documentation:** https://docs.minimals.cc/
- **Mock Server Guide:** https://docs.minimals.cc/mock-server
- **Migration Guide:** https://docs.minimals.cc/migrate-to-cra/

---

## ⚠️ Important Notes

1. **Dependency:** The project **cannot run without** `minimal-shared` package
2. **Template Base:** This is a **starter template**, not built from scratch
3. **Customization:** Significant customizations have been made for the reports feature
4. **License:** Check the Minimal template license for commercial use

---

## 🔍 Finding All Usages

To see all files using minimal-shared:
```bash
grep -r "minimal-shared" src/
```

**Result:** 143+ files import from `minimal-shared`

---

## 💡 What This Means

- ✅ **Well-structured foundation** - Built on a professional template
- ✅ **Consistent patterns** - Follows Minimal template conventions
- ✅ **Maintained utilities** - Uses tested utility functions
- ⚠️ **Template dependency** - Relies on external package
- ⚠️ **Template updates** - May need to sync with template updates

---

## 🎯 Summary

**Yes, minimals.cc is extensively used in this project.** It's the foundation of the entire application, providing:
- Core utilities
- React hooks
- Theme system
- Layout components
- UI component patterns

The project is a **customized version** of the Minimal Dashboard Template v7.0.0, specifically the Vite.js JavaScript starter variant.

