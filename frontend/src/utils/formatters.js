
import { formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format a date string as a relative time (e.g., "5 minutes ago")
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted relative time
 */
export const formatRelativeTime = (dateString) => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format a number with abbreviations (e.g., 1.5k for 1500)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
};

/**
 * Format a date string for experience (e.g., "Jun 2021 - Present")
 * @param {string} startDate - Start date (YYYY-MM format)
 * @param {string|null} endDate - End date (YYYY-MM format) or null for present
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  if (!startDate) return '';
  
  const [startYear, startMonth] = startDate.split('-');
  const startMonthName = new Date(startYear, parseInt(startMonth) - 1).toLocaleString('default', { month: 'short' });
  
  let endString = 'Present';
  if (endDate) {
    const [endYear, endMonth] = endDate.split('-');
    const endMonthName = new Date(endYear, parseInt(endMonth) - 1).toLocaleString('default', { month: 'short' });
    endString = `${endMonthName} ${endYear}`;
  }
  
  return `${startMonthName} ${startYear} - ${endString}`;
};
