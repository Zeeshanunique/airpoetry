/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Service for loading and managing pollution data
 * Includes Context-Aware Normalization Logic (Patent Claim 3)
 * Now returns unified AQI (Air Quality Index) values
 */

const pollutionDataCache = {};

// [INVENTIVE STEP] City Profiles for Context-Aware Normalization
const CITY_PROFILES = {
  "Bergamo": {
    baseline: 25,
    sensitivityFactor: 1.0
  },
  "Treviglio": {
    baseline: 20,
    sensitivityFactor: 1.1
  },
  "Bizerte": {
    baseline: 15,
    sensitivityFactor: 1.2
  },
  "default": {
    baseline: 20,
    sensitivityFactor: 1.0
  }
};

/**
 * European AQI Categories (EAQI scale 0-150)
 * 
 * Based on European Environment Agency standards:
 * https://airindex.eea.europa.eu/AQI/index.html
 */
export const AQI_CATEGORIES = {
  GOOD: { min: 0, max: 20, label: 'Good', color: '#22c55e', description: 'Air quality is excellent' },
  FAIR: { min: 21, max: 40, label: 'Fair', color: '#84cc16', description: 'Air quality is acceptable' },
  MODERATE: { min: 41, max: 60, label: 'Moderate', color: '#eab308', description: 'Sensitive people may be affected' },
  POOR: { min: 61, max: 80, label: 'Poor', color: '#f97316', description: 'Health effects possible for everyone' },
  VERY_POOR: { min: 81, max: 100, label: 'Very Poor', color: '#ef4444', description: 'Serious health effects' },
  EXTREMELY_POOR: { min: 101, max: 150, label: 'Extremely Poor', color: '#7f1d1d', description: 'Emergency conditions' }
};

/**
 * European AQI Breakpoints for PM2.5 (µg/m³)
 * Maps concentration to EAQI 0-100 scale
 */
export const calculateEAQIFromPM25 = (pm25) => {
  if (pm25 === null || pm25 === undefined) return 0;
  
  // EAQI breakpoints for PM2.5 (24-hour average)
  const breakpoints = [
    { cLow: 0, cHigh: 10, iLow: 0, iHigh: 20 },      // Good
    { cLow: 10, cHigh: 20, iLow: 20, iHigh: 40 },    // Fair
    { cLow: 20, cHigh: 25, iLow: 40, iHigh: 60 },    // Moderate
    { cLow: 25, cHigh: 50, iLow: 60, iHigh: 80 },    // Poor
    { cLow: 50, cHigh: 75, iLow: 80, iHigh: 100 },   // Very Poor
    { cLow: 75, cHigh: 800, iLow: 100, iHigh: 150 }  // Extremely Poor
  ];

  for (const bp of breakpoints) {
    if (pm25 >= bp.cLow && pm25 < bp.cHigh) {
      return Math.round(
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.iLow
      );
    }
  }
  return pm25 >= 800 ? 150 : 0;
};

/**
 * European AQI Breakpoints for PM10 (µg/m³)
 * Maps concentration to EAQI 0-100 scale
 */
export const calculateEAQIFromPM10 = (pm10) => {
  if (pm10 === null || pm10 === undefined) return 0;
  
  // EAQI breakpoints for PM10 (24-hour average)
  const breakpoints = [
    { cLow: 0, cHigh: 20, iLow: 0, iHigh: 20 },      // Good
    { cLow: 20, cHigh: 40, iLow: 20, iHigh: 40 },    // Fair
    { cLow: 40, cHigh: 50, iLow: 40, iHigh: 60 },    // Moderate
    { cLow: 50, cHigh: 100, iLow: 60, iHigh: 80 },   // Poor
    { cLow: 100, cHigh: 150, iLow: 80, iHigh: 100 }, // Very Poor
    { cLow: 150, cHigh: 1200, iLow: 100, iHigh: 150 } // Extremely Poor
  ];

  for (const bp of breakpoints) {
    if (pm10 >= bp.cLow && pm10 < bp.cHigh) {
      return Math.round(
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm10 - bp.cLow) + bp.iLow
      );
    }
  }
  return pm10 >= 1200 ? 150 : 0;
};

/**
 * Get European AQI category from EAQI value
 */
export const getAQICategory = (aqi) => {
  if (aqi <= 20) return AQI_CATEGORIES.GOOD;
  if (aqi <= 40) return AQI_CATEGORIES.FAIR;
  if (aqi <= 60) return AQI_CATEGORIES.MODERATE;
  if (aqi <= 80) return AQI_CATEGORIES.POOR;
  if (aqi <= 100) return AQI_CATEGORIES.VERY_POOR;
  return AQI_CATEGORIES.EXTREMELY_POOR;
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
 * Load both PM10 and PM2.5 data for a city to calculate AQI
 */
export const loadCityAQIData = async (city) => {
  try {
    const [pm10Data, pm25Data] = await Promise.all([
      loadPollutionData(city, "pm10"),
      loadPollutionData(city, "pm2.5")
    ]);
    return { pm10Data, pm25Data };
  } catch (error) {
    console.error("Error loading AQI data:", error);
    throw error;
  }
};

/**
 * Calculate AQI for a date range using both PM10 and PM2.5 data
 */
export const calculateAQIForDateRange = (pm10Data, pm25Data, fromDate, toDate) => {
  const startStr = fromDate.toISOString().split("T")[0];
  const endStr = toDate.toISOString().split("T")[0];

  // Filter PM10 data
  const filteredPm10 = pm10Data.filter((entry) => {
    const entryDate = new Date(entry.date).toISOString().split("T")[0];
    return startStr <= entryDate && entryDate <= endStr;
  });

  // Filter PM2.5 data
  const filteredPm25 = pm25Data.filter((entry) => {
    const entryDate = new Date(entry.date).toISOString().split("T")[0];
    return startStr <= entryDate && entryDate <= endStr;
  });

  // Calculate averages
  const avgPm10 = filteredPm10.length > 0
    ? filteredPm10.reduce((sum, e) => sum + parseFloat(e.pollution_rate), 0) / filteredPm10.length
    : 0;
  
  const avgPm25 = filteredPm25.length > 0
    ? filteredPm25.reduce((sum, e) => sum + parseFloat(e.pollution_rate), 0) / filteredPm25.length
    : 0;

  // Calculate European sub-AQIs
  const pm10Eaqi = calculateEAQIFromPM10(avgPm10);
  const pm25Eaqi = calculateEAQIFromPM25(avgPm25);

  // EAQI is the maximum of all sub-indices
  const aqi = Math.max(pm10Eaqi, pm25Eaqi);

  return {
    aqi,
    aqiCategory: getAQICategory(aqi),
    pollutantBreakdown: {
      pm10: avgPm10,
      pm25: avgPm25
    }
  };
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
