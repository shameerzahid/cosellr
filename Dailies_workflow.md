The Dailies module is built around a two-level hierarchy:
1. Portfolio Dailies — top-level daily records, one per seller portfolio.
2. ASIN Dailies — nested daily records belonging to each Portfolio Daily, one per ASIN
inside that portfolio.
Both levels share the same 12-item daily checklist.
Both levels also support their own independent logging system.
This means every checklist item at the Portfolio level has its own log history, and every
checklist item for each ASIN has its own log history as well.
Step 1 — Load Portfolio Dailies (Without ASINs)
Your first data request should use the lightweight endpoint:
GET
https://cosellr-backend.onrender.com/dailies/api/all-portfoliodailies-without-asins/
This endpoint returns only the Portfolio Dailies, without any nested ASIN Daily records.
We intentionally designed it this way to make the initial screen render fast.
The response already contains all the information you need at the portfolio level, including:
 Portfolio name
 Territory / marketplace
 Portfolio-level checklist statuses
These fields are enough to render the top-level collapsible rows and show their status
indicators.
At this stage you do not need ASIN-level data, logs, or historical entries — none of that is
required until the user expands a specific portfolio.
Step 2 — Load ASIN Dailies on Demand When a Portfolio Row Expands
For each portfolio row in the table, you will build a dedicated React component.
When the user expands (or clicks) that row, this component should dynamically load the ASIN
Dailies belonging to that specific portfolio.
Use the following endpoint:
GET
https://cosellr-backend.onrender.com/dailies/api/portfoliodailies-with-
asins/{portfolioDailyId}/
Example:
https://cosellr-backend.onrender.com/dailies/api/portfoliodailies-with-asins/1343/
This request returns a full JSON payload containing all ASIN-level dailies attached to that
portfolio, including their own checklist statuses.
These ASIN items must be rendered as the nested collapsible rows inside the portfolio row.
Step 3 — Displaying Checklist History in the Side Drawer
Each portfolio row contains 12 checklist items, and each item has a status in the JSON response
from the initial portfolio API:
{
"portfolio_dailies_without_asins": [
{
"id": 1362,
"portfolio_id": 35,
"portfolio_name": "BR",
"marketplace_id": 4,
"marketplace_name": "Brazil",
"date": "2025-11-18",
"negative_feedback": 1,
"negative_reviews": 1,
"star_rating": 1,
"voice_customer": 1,
"inventory_availability": 2,
"oversize": 1,
"fba_overcharges": 1,
"deals_error": 1,
"listing_completeness": 1,
"buybox_hijacker": 1,
"main_category": 1,
"sub_category": 1
}
]
}
Key Points to Understand:
1. Each field (e.g., star_rating, inventory_availability) is a checklist item.
o The number represents the current status.
o The field name will also be used to fetch its history logs.
2. Triggering the Side Drawer:
o Each checklist item should be rendered as a button or clickable icon in the
portfolio row.
o When clicked:
 Open the side drawer sliding from the right
 Display the history of logs for that specific checklist item
3. Fetching the History:
o History API depends on two parameters:
1. portfolio_dailies_id (from the JSON, e.g., 1362)
2. checklist field name (from the same JSON, e.g., star_rating)
o Example endpoint to fetch history for “star_rating”:
o
GET https://cosellr-backend.onrender.com/dailies/api/portfoliodailies-
log/1362/star_rating/history/
3. Passing Data to Components:
 The button or icon component for each checklist item must receive:
o portfolio_dailies_id
o checklist_field_name
 On click, this component calls the history API and populates the side drawer with:
o Past logs (read-only list)
o Input field for new log
o Save and Cancel buttons
You can see the reponse:
{
"success": true,
"history": [
{
"log": "4.7 out of 5 stars (333)",
"date": "2025-10-18"
},
{
"log": "4.7 out of 5 stars (343)\n──────────────\n4.7 out of 5 stars (343)",
"date": "2025-11-12"
}
]
}
Render them in the side drawer menu in boxes by the day, just like you see it in the Django
template UI.
Step 4 — ASIN Dailies Checklist & History Drawer
The ASIN-level dailies follow the same structure and logic as Portfolio Dailies:
1. JSON Structure:
o Each ASIN daily item contains the 12 checklist fields, each with its current status
value.
o Example field: inventory_availability: 2
2. Triggering the Side Drawer:
o Each checklist item in an ASIN row should be a clickable icon or button.
o When clicked:
 Open the side drawer from the right
 Display the history logs for the specific checklist item at the ASIN level
3. Fetching ASIN History:
o Endpoint requires two parameters: asin_daily_id (from JSON, e.g., 39095) and the
checklist_field_name (from JSON, e.g., inventory_availability)
o Example endpoint:
GET https://cosellr-backend.onrender.com/dailies/api/asindaily-
log/39095/inventory_availability/history/
4 Rendering Logs:
 Fetch logs by date
 Display them in a read-only list or boxes, grouped or ordered by date
 Provide input field at the bottom for adding a new log, with Save and Cancel buttons
5 Passing Props to Components:
 Each checklist button receives:
o asin_daily_id
o checklist_field_name
 These props are used to construct the API URL dynamically when the drawer is opened
Step 5 — Saving a New Log
Both Portfolio Dailies and ASIN Dailies support saving new logs using a POST request.
1. Portfolio Dailies
 Endpoint (example):
POST https://cosellr-backend.onrender.com/dailies/api/portfoliodailies-
log/1362/inventory_availability/save/
 Payload:
{
"log": "this is a portfolio dailies payload, notice no status!"
}
 Behavior:
o Sends the new log for the selected checklist item of the portfolio
o The response returns the updated Portfolio Dailies object
o Use this response to update the portfolio row in the frontend, reflecting the new
status or log changes
2. ASIN Dailies
 Endpoint (example):
POST https://cosellr-backend.onrender.com/dailies/api/asindaily-
log/39094/inventory_availability/save/
 Payload:
{
"log": "this is an ASIN dailies payload",
"status": "1"
}
 Behavior:
o Sends the new log for a specific checklist item of the ASIN
o The response returns the parent Portfolio Dailies object, because updates at the
ASIN level may affect the portfolio-level UI
o Use this response to re-render the entire portfolio row, including all nested ASIN
rows, to keep the UI consistent
Frontend Implementation Notes
 After saving a log:
1. Close the side drawer
2. Update the corresponding portfolio row or ASIN row using the returned object
3. Ensure the status indicators are updated correctly based on the new data
 Always use the field name and ID to construct the POST URL dynamically, matching the
checklist item clicked