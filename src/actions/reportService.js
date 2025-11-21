import axiosInstance, { endpoints } from 'src/lib/axios';

/**
 * Fetch midweekly portfolio metrics.
 * @param {string} startDate - The start date for the metrics (e.g., '2025-06-08').
 * @returns {Promise<Object>} - The response data from the API.
 */
export const fetchMidWeeklyPortfolioMetrics = async (startDate) => {
    const url = `${endpoints.reports.midweeklyPortfolioMetrics}?start_date=${startDate}`;
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch midweekly portfolio metrics:', error);
        throw error;
    }
};


/**
 * Fetch weekly portfolio metrics.
 * @param {string} startDate - The start date for the metrics (e.g., '2025-06-08').
 * @returns {Promise<Object>} - The response data from the API.
 */
export const fetchWeeklyPortfolioMetrics = async (startDate) => {
    const url = `${endpoints.reports.weeklyPortfolioMetrics}?week_start=${startDate}`;
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch weekly portfolio metrics:', error);
        throw error;
    }
};