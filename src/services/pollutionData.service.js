/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Service for loading and managing pollution data
 * Includes Context-Aware Normalization Logic (Patent Claim 3)
 */

const pollutionDataCache = {};

// [INVENTIVE STEP] City Profiles for Context-Aware Normalization
// This structure allows the system to interpret "severity" relative to the specific location,
// rather than using a single global standard.
const CITY_PROFILES = {
  "Bergamo": {
    baseline: 25, // Industrial north, higher baseline
    sensitivityFactor: 1.0
  },
  "Treviglio": {
    baseline: 20,
    sensitivityFactor: 1.1 // Slightly more sensitive interpretation
  },
  "Bizerte": {
    baseline: 15, // Coastal, generally cleaner air, lower baseline
    sensitivityFactor: 1.2 // "High" pollution here is felt more acutely
  },
  "default": {
    baseline: 20,
    sensitivityFactor: 1.0
  }
};

/**
 * Load pollution data for a specific city and pollutant
 */
export const loadPollutionData = async (city, pollutant) => {
  const key = `${city}-${pollutant}`;
  
  if (pollutionDataCache[key]) {
    return pollutionDataCache[key];
  }

  try {
    let dataFile;
    
    // Map city and pollutant to data file
    if (city === "Bergamo" && pollutant === "pm10") {
      dataFile = "pollution_data_bergamopm10.json";
    } else if (city === "Bergamo" && pollutant === "pm2.5") {
      dataFile = "pollution_data_bergamopm25.json";
    } else if (city === "Treviglio" && pollutant === "pm10") {
      dataFile = "pollution_data_trevigliopm10.json";
    } else if (city === "Treviglio" && pollutant === "pm2.5") {
      dataFile = "pollution_data_trevigliopm25.json";
    } else if (city === "Bizerte" && pollutant === "pm10") {
      // Fallback to Bergamo data for Bizerte
      dataFile = "pollution_data_bergamopm10.json";
    } else if (city === "Bizerte" && pollutant === "pm2.5") {
      dataFile = "pollution_data_bergamopm25.json";
    } else {
      throw new Error(`No data available for ${city} and ${pollutant}`);
    }

    const data = await import(`../data/${dataFile}`);
    pollutionDataCache[key] = data.default;
    return data.default;
  } catch (error) {
    console.error("Error loading pollution data:", error);
    throw error;
  }
};

/**
 * Calculate average pollution rate for a date range
 * Applies normalization if city context is provided (though currently raw avg is used for UI consistency)
 */
export const calculateAvgPollutionRate = (pollutionData, fromDate, toDate) => {
  if (!pollutionData || pollutionData.length === 0) {
    return 0;
  }

  const startStr = fromDate.toISOString().split("T")[0];
  const endStr = toDate.toISOString().split("T")[0];

  const filteredData = pollutionData.filter((entry) => {
    const entryDate = new Date(entry.date).toISOString().split("T")[0];
    return startStr <= entryDate && entryDate <= endStr;
  });

  if (filteredData.length === 0) {
    return 0;
  }

  const pollutionRates = filteredData.map((entry) => parseFloat(entry.pollution_rate));
  const avgRate = pollutionRates.reduce((a, b) => a + b, 0) / pollutionRates.length;

  return avgRate;
};

/**
 * [PATENT CLAIM METHOD]
 * Calculates a "Contextual Severity Index" based on the city profile.
 * This differentiates the "Raw Value" from the "Perceived Impact".
 * 
 * @param {number} rawRate - The raw average pollution value.
 * @param {string} city - The city context.
 * @returns {number} The normalized severity score.
 */
export const getContextualSeverity = (rawRate, city) => {
  const profile = CITY_PROFILES[city] || CITY_PROFILES["default"];
  
  // Logic: Deviation from baseline, scaled by sensitivity
  // Positive deviation = worse than normal for that city
  const deviation = rawRate - profile.baseline;
  const severity = deviation * profile.sensitivityFactor;
  
  return severity;
};

/**
 * Returns the City Profile for a given city.
 * Exported for use by the Constraint Engine.
 * 
 * @param {string} city - The city name.
 * @returns {Object} The city profile with baseline and sensitivityFactor.
 */
export const getCityProfile = (city) => {
  return CITY_PROFILES[city] || CITY_PROFILES["default"];
};

/**
 * Clear pollution data cache
 */
export const clearPollutionDataCache = () => {
  Object.keys(pollutionDataCache).forEach((key) => {
    delete pollutionDataCache[key];
  });
};
