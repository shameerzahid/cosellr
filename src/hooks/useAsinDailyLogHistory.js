import useSWR from 'swr';
import { fetchAsinDailyLogHistory } from 'src/actions/dailiesService';

/**
 * Custom hook to fetch ASIN daily log history for a specific checklist item
 * @param {number|null} asinDailyId - The ID of the ASIN daily record
 * @param {string|null} field - The checklist field name (e.g., 'inventory_availability')
 * @param {boolean} enabled - Whether to fetch (when drawer is open)
 * @returns {Object} - History data, loading, and error states
 */
export const useAsinDailyLogHistory = (asinDailyId, field, enabled = false) => {
  const { data, error, isLoading } = useSWR(
    enabled && asinDailyId && field
      ? `/dailies/api/asindaily-log/${asinDailyId}/${field}/history/`
      : null,
    () => fetchAsinDailyLogHistory(asinDailyId, field),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    history: data?.history || [],
    success: data?.success || false,
    isLoading,
    error,
  };
};

