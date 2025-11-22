import axiosInstance, { endpoints } from 'src/lib/axios';

/**
 * Fetch all portfolio dailies without ASINs (lightweight initial load)
 * @returns {Promise<Object>} - The response data containing portfolio_dailies_without_asins array
 */
export const fetchAllPortfolioDailiesWithoutAsins = async () => {
  try {
    const response = await axiosInstance.get(endpoints.dailies.allPortfolioDailiesWithoutAsins);
    return response.data;
  } catch (error) {
    console.error('[API] Failed to fetch portfolio dailies:', error);
    throw error;
  }
};

/**
 * Fetch portfolio dailies with nested ASINs for a specific portfolio
 * @param {number} portfolioDailyId - The ID of the portfolio daily record
 * @returns {Promise<Object>} - The response data containing portfolio with nested ASINs
 */
export const fetchPortfolioDailiesWithAsins = async (portfolioDailyId) => {
  try {
    const url = endpoints.dailies.portfolioDailiesWithAsins(portfolioDailyId);
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('[API] Failed to fetch portfolio dailies with ASINs:', error);
    throw error;
  }
};

/**
 * Fetch history logs for a portfolio daily checklist item
 * @param {number} portfolioDailyId - The ID of the portfolio daily record
 * @param {string} field - The checklist field name (e.g., 'star_rating', 'inventory_availability')
 * @returns {Promise<Object>} - The response data containing history array
 */
export const fetchPortfolioDailyLogHistory = async (portfolioDailyId, field) => {
  try {
    const url = endpoints.dailies.portfolioDailyLogHistory(portfolioDailyId, field);
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('[API] Failed to fetch portfolio daily log history:', error);
    throw error;
  }
};

/**
 * Save a new log entry for a portfolio daily checklist item
 * @param {number} portfolioDailyId - The ID of the portfolio daily record
 * @param {string} field - The checklist field name
 * @param {string} log - The log text to save
 * @returns {Promise<Object>} - The updated portfolio dailies object
 */
export const savePortfolioDailyLog = async (portfolioDailyId, field, log) => {
  try {
    const url = endpoints.dailies.portfolioDailyLogSave(portfolioDailyId, field);
    const response = await axiosInstance.post(url, { log });
    return response.data;
  } catch (error) {
    console.error('[API] Failed to save portfolio daily log:', error);
    throw error;
  }
};

/**
 * Fetch history logs for an ASIN daily checklist item
 * @param {number} asinDailyId - The ID of the ASIN daily record
 * @param {string} field - The checklist field name
 * @returns {Promise<Object>} - The response data containing history array
 */
export const fetchAsinDailyLogHistory = async (asinDailyId, field) => {
  try {
    const url = endpoints.dailies.asinDailyLogHistory(asinDailyId, field);
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('[API] Failed to fetch ASIN daily log history:', error);
    throw error;
  }
};

/**
 * Save a new log entry for an ASIN daily checklist item
 * @param {number} asinDailyId - The ID of the ASIN daily record
 * @param {string} field - The checklist field name
 * @param {string} log - The log text to save
 * @param {string} status - The status value (e.g., "1", "2")
 * @returns {Promise<Object>} - The updated parent portfolio dailies object
 */
export const saveAsinDailyLog = async (asinDailyId, field, log, status) => {
  try {
    const url = endpoints.dailies.asinDailyLogSave(asinDailyId, field);
    const response = await axiosInstance.post(url, { log, status });
    return response.data;
  } catch (error) {
    console.error('[API] Failed to save ASIN daily log:', error);
    throw error;
  }
};

