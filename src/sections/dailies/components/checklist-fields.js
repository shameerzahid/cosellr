/**
 * The 12 predefined daily checklist items
 * These match the field names from the API response
 */
export const CHECKLIST_FIELDS = [
  { id: 'negative_feedback', label: 'Negative Feedback' },
  { id: 'negative_reviews', label: 'Negative Reviews' },
  { id: 'star_rating', label: 'Star Rating' },
  { id: 'voice_customer', label: 'Voice Customer' },
  { id: 'inventory_availability', label: 'Inventory Availability' },
  { id: 'oversize', label: 'Oversize' },
  { id: 'fba_overcharges', label: 'FBA Overcharges' },
  { id: 'deals_error', label: 'Deals Error' },
  { id: 'listing_completeness', label: 'Listing Completeness' },
  { id: 'buybox_hijacker', label: 'Buybox Hijacker' },
  { id: 'main_category', label: 'Main Category' },
  { id: 'sub_category', label: 'Sub Category' },
];

/**
 * Get checklist field by ID
 */
export const getChecklistField = (fieldId) => CHECKLIST_FIELDS.find((field) => field.id === fieldId);

/**
 * Get checklist field label
 */
export const getChecklistFieldLabel = (fieldId) => {
  const field = getChecklistField(fieldId);
  return field?.label || fieldId;
};

