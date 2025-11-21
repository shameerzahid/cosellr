import useSWR from 'swr';
import { fetchMidWeeklyPortfolioMetrics } from 'src/actions/reportService';

/**
 * Custom hook to fetch weekly portfolio metrics.
 * @param {string} startDate - The start date for the metrics (e.g., '2025-06-08').
 * @returns {Object} - Data, loading, and error states.
 */
export const useMidWeeklyReport = (startDate) => {
    const { data, error, isLoading } = useSWR(
        startDate ? `/api/reports/midweekly-portfolio-metrics?start_date=${startDate}` : null,
        () => fetchMidWeeklyPortfolioMetrics(startDate)
    );

    return {
        data,
        isLoading,
        error,
    };
};