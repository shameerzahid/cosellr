import useSWR from 'swr';
import { fetchPortfolioDailyLogHistory } from 'src/actions/dailiesService';

/**
 * Custom hook to fetch portfolio daily log history for a specific checklist item
 * @param {number|null} portfolioDailyId - The ID of the portfolio daily record
 * @param {string|null} field - The checklist field name (e.g., 'star_rating')
 * @param {boolean} enabled - Whether to fetch (when drawer is open)
 * @returns {Object} - History data, loading, and error states
 */
export const usePortfolioDailyLogHistory = (portfolioDailyId, field, enabled = false) => {
  const { data, error, isLoading } = useSWR(
    enabled && portfolioDailyId && field
      ? `/dailies/api/portfoliodailies-log/${portfolioDailyId}/${field}/history/`
      : null,
    () => fetchPortfolioDailyLogHistory(portfolioDailyId, field),
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

