import useSWR from 'swr';
import { fetchAllPortfolioDailiesWithoutAsins } from 'src/actions/dailiesService';

/**
 * Custom hook to fetch all portfolio dailies without ASINs
 * This is the lightweight initial load for Step 1
 * @returns {Object} - Data, loading, and error states
 */
export const useDailies = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/dailies/api/all-portfoliodailies-without-asins/',
    fetchAllPortfolioDailiesWithoutAsins,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  // Handle both array response and wrapped response
  const portfolios = Array.isArray(data) 
    ? data 
    : data?.portfolio_dailies_without_asins || [];

  return {
    data: portfolios,
    isLoading,
    error,
    mutate,
  };
};

