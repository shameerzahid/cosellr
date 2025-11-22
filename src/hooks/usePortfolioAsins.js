import useSWR from 'swr';
import { fetchPortfolioDailiesWithAsins } from 'src/actions/dailiesService';

/**
 * Custom hook to fetch ASIN dailies for a specific portfolio
 * Only fetches when portfolioDailyId is provided and portfolio is expanded
 * @param {number|null} portfolioDailyId - The ID of the portfolio daily record
 * @param {boolean} enabled - Whether to fetch (when portfolio is expanded)
 * @returns {Object} - Data, loading, and error states
 */
export const usePortfolioAsins = (portfolioDailyId, enabled = false) => {
  const { data, error, isLoading } = useSWR(
    enabled && portfolioDailyId
      ? `/dailies/api/portfoliodailies-with-asins/${portfolioDailyId}/`
      : null,
    () => fetchPortfolioDailiesWithAsins(portfolioDailyId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Try multiple possible field names for ASINs (API uses 'asindailies' - no underscore)
  const asins = data?.asindailies || data?.asin_dailies || data?.asin_daily || data?.asins || data?.asin_dailies_list || [];

  return {
    asins,
    isLoading,
    error,
  };
};

