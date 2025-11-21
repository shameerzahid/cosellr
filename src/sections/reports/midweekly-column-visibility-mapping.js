

/**
 * @file midweekly-column-visibility-mapping.js
 * @description Defines the visibility mapping for columns in a midweekly report based on different time periods.
 * Each time period (Beginning, Middle, End, Full) specifies which columns are visible for specific days of the week
 * and additional categories like "thisWeek" and "lastWeek".
 *
 * @module weekColumnMapping
 */

export const weekColumnMapping = {
    Beginning: {
        portfolio: true,
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        thisWeek: true,
        lastWeek: true,
        history: true,
    },
    Middle: {
        portfolio: true,
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: false,
        saturday: false,
        thisWeek: true,
        lastWeek: true,
        history: true,
    },
    End: {
        portfolio: true,
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: true,
        saturday: true,
        thisWeek: true,
        lastWeek: true,
        history: true,
    },
    Full: {
        portfolio: true,
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        thisWeek: true,
        lastWeek: true,
        history: true,
    },
};
