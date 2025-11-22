# API Logs Reference - Dailies Module

This document lists all API endpoints and their console log search terms. Use these search terms in your browser console to find and share the API responses.

---

## 📋 **API Endpoints Overview**

### 1. **Initial Portfolio Load (Without ASINs)**
**Endpoint:** `GET /dailies/api/all-portfoliodailies-without-asins/`

**Console Log Search Terms:**
- `[API] Fetching all portfolio dailies without ASINs`
- `[API] Portfolio dailies response:`
- `[API] Portfolio count:`

**What to Share:**
- The full response object from `[API] Portfolio dailies response:`
- Check if `portfolio_dailies_without_asins` array exists and its structure

---

### 2. **Load ASINs for a Portfolio (When Expanded)**
**Endpoint:** `GET /dailies/api/portfoliodailies-with-asins/{portfolioDailyId}/`

**Console Log Search Terms:**
- `[API] Fetching portfolio dailies with ASINs`
- `[API] Portfolio with ASINs - Full response:`
- `[API] Response keys:`
- `[API] Found array field`
- `[API] First ASIN sample:`

**What to Share:**
- The full response object from `[API] Portfolio with ASINs - Full response:`
- All keys from `[API] Response keys:`
- Any array fields found from `[API] Found array field`
- First ASIN sample if available

---

### 3. **Portfolio Checklist History**
**Endpoint:** `GET /dailies/api/portfoliodailies-log/{id}/{field}/history/`

**Console Log Search Terms:**
- `[API] Fetching portfolio daily log history`
- `[API] Portfolio log history response:`
- `[API] History count:`

**What to Share:**
- The full response from `[API] Portfolio log history response:`
- Check if `history` array exists and its structure
- Example: `{ success: true, history: [...] }`

---

### 4. **Save Portfolio Log**
**Endpoint:** `POST /dailies/api/portfoliodailies-log/{id}/{field}/save/`

**Console Log Search Terms:**
- `[API] Saving portfolio daily log`
- `[API] Payload:`
- `[API] Portfolio log save response:`

**What to Share:**
- The payload sent: `{ log: "..." }`
- The full response from `[API] Portfolio log save response:`
- Check what object is returned (should be updated Portfolio Dailies object)

---

### 5. **ASIN Checklist History**
**Endpoint:** `GET /dailies/api/asindaily-log/{id}/{field}/history/`

**Console Log Search Terms:**
- `[API] Fetching ASIN daily log history`
- `[API] ASIN log history response:`
- `[API] History count:`

**What to Share:**
- The full response from `[API] ASIN log history response:`
- Check if `history` array exists and its structure

---

### 6. **Save ASIN Log**
**Endpoint:** `POST /dailies/api/asindaily-log/{id}/{field}/save/`

**Console Log Search Terms:**
- `[API] Saving ASIN daily log`
- `[API] Payload:`
- `[API] ASIN log save response:`

**What to Share:**
- The payload sent: `{ log: "...", status: "1" }`
- The full response from `[API] ASIN log save response:`
- Check what object is returned (should be parent Portfolio Dailies object)

---

## 🔍 **Additional Hook Logs**

### Hook: `usePortfolioAsins`
**Console Log Search Terms:**
- `[HOOK] usePortfolioAsins called:`
- `[HOOK] usePortfolioAsins state:`
- `[HOOK] Full data structure:`
- `[HOOK] Extracted ASINs:`

**What to Share:**
- The data structure from `[HOOK] Full data structure:`
- The extracted ASINs info from `[HOOK] Extracted ASINs:`

---

### Hook: `useDailies`
**Console Log Search Terms:**
- `[VIEW] Initial portfolios received:`
- `[VIEW] Current portfolios state:`

---

## 📝 **How to Use This Document**

1. **Open Browser Console** (F12 or Cmd+Option+I)
2. **Filter Console** - Use the search/filter box in console
3. **Search for the log term** - Copy one of the search terms above
4. **Copy the Response** - Right-click on the logged object → "Copy object" or expand and screenshot
5. **Share with Developer** - Share the response structure

---

## 🎯 **Quick Checklist**

When testing, please share responses for:

- [ ] Initial portfolio load response
- [ ] ASINs response when expanding a portfolio
- [ ] Portfolio history response (click any portfolio checklist item)
- [ ] ASIN history response (click any ASIN checklist item)
- [ ] Portfolio save response (save a log for portfolio)
- [ ] ASIN save response (save a log for ASIN)

---

## ⚠️ **Error Logs**

If you see any errors, search for:
- `[API] Failed to fetch`
- `[API] Error details:`
- `[API] Error response:`

Share the full error object and status code.

