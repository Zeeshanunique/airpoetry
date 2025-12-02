/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Live Air Quality API Service
 * 
 * Uses Open-Meteo Air Quality API (free, no API key required)
 * Provides real-time pollution data for any location worldwide.
 * 
 * API Documentation: https://open-meteo.com/en/docs/air-quality-api
 */

const OPEN_METEO_BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

/**
 * Fetches current air quality data for a given location.
 * 
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @returns {Promise<Object>} Air quality data including PM10, PM2.5, etc.
 */
export const fetchCurrentAirQuality = async (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi,us_aqi',
    timezone: 'auto'
  });

  try {
    const response = await fetch(`${OPEN_METEO_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      },
      current: {
        time: data.current.time,
        pm10: data.current.pm10,
        pm25: data.current.pm2_5,
        co: data.current.carbon_monoxide,
        no2: data.current.nitrogen_dioxide,
        so2: data.current.sulphur_dioxide,
        o3: data.current.ozone,
        europeanAqi: data.current.european_aqi,
        usAqi: data.current.us_aqi
      },
      source: 'Open-Meteo Air Quality API',
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return {
      success: false,
      error: error.message,
      source: 'Open-Meteo Air Quality API'
    };
  }
};

/**
 * Fetches historical air quality data for a date range.
 * Open-Meteo provides up to 92 days of historical data.
 * 
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<Object>} Historical air quality data
 */
export const fetchHistoricalAirQuality = async (latitude, longitude, startDate, endDate) => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: 'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
    start_date: startDate,
    end_date: endDate,
    timezone: 'auto'
  });

  try {
    const response = await fetch(`${OPEN_METEO_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Calculate averages from hourly data
    const hourlyData = data.hourly;
    const validPm10 = hourlyData.pm10.filter(v => v !== null);
    const validPm25 = hourlyData.pm2_5.filter(v => v !== null);
    const validNo2 = hourlyData.nitrogen_dioxide.filter(v => v !== null);

    const avgPm10 = validPm10.length > 0 
      ? validPm10.reduce((a, b) => a + b, 0) / validPm10.length 
      : 0;
    const avgPm25 = validPm25.length > 0 
      ? validPm25.reduce((a, b) => a + b, 0) / validPm25.length 
      : 0;
    const avgNo2 = validNo2.length > 0 
      ? validNo2.reduce((a, b) => a + b, 0) / validNo2.length 
      : 0;

    return {
      success: true,
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      },
      period: {
        start: startDate,
        end: endDate,
        dataPoints: hourlyData.time.length
      },
      averages: {
        pm10: avgPm10,
        pm25: avgPm25,
        no2: avgNo2
      },
      hourly: {
        time: hourlyData.time,
        pm10: hourlyData.pm10,
        pm25: hourlyData.pm2_5,
        no2: hourlyData.nitrogen_dioxide
      },
      source: 'Open-Meteo Air Quality API',
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching historical air quality data:', error);
    return {
      success: false,
      error: error.message,
      source: 'Open-Meteo Air Quality API'
    };
  }
};

/**
 * Gets the average pollution rate for a specific pollutant from live API.
 * This function provides a unified interface matching the historical data service.
 * 
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @param {string} pollutant - Pollutant type ('pm10', 'pm2.5', 'no2')
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<number>} Average pollution rate
 */
export const getLiveAvgPollutionRate = async (latitude, longitude, pollutant, startDate, endDate) => {
  const data = await fetchHistoricalAirQuality(latitude, longitude, startDate, endDate);
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch live pollution data');
  }

  // Map pollutant names to API response keys
  const pollutantMap = {
    'pm10': 'pm10',
    'pm2.5': 'pm25',
    'no2': 'no2'
  };

  const key = pollutantMap[pollutant.toLowerCase()];
  if (!key) {
    throw new Error(`Unknown pollutant: ${pollutant}`);
  }

  return data.averages[key] || 0;
};

