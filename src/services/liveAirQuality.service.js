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
 * Uses the API-provided European AQI (EAQI) values directly.
 * 
 * European AQI Scale (0-100+):
 * - 0-20: Good
 * - 20-40: Fair  
 * - 40-60: Moderate
 * - 60-80: Poor
 * - 80-100: Very Poor
 * - 100+: Extremely Poor
 * 
 * API Documentation: https://open-meteo.com/en/docs/air-quality-api
 */

const OPEN_METEO_BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

/**
 * European AQI Categories (EAQI scale 0-100+)
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
 * Get European AQI category info from EAQI value
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
 * Fetches current air quality data for a given location.
 * Uses European AQI directly from the API.
 */
export const fetchCurrentAirQuality = async (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'pm10,pm2_5,european_aqi',
    timezone: 'auto'
  });

  try {
    const response = await fetch(`${OPEN_METEO_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const aqi = current.european_aqi || 0;
    
    return {
      success: true,
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      },
      aqi: aqi,
      aqiCategory: getAQICategory(aqi),
      pollutantBreakdown: {
        pm25: current.pm2_5,
        pm10: current.pm10
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
 * Fetches historical air quality data.
 * Uses European AQI directly from the API.
 */
export const fetchHistoricalAirQuality = async (latitude, longitude, startDate, endDate) => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: 'pm10,pm2_5,european_aqi',
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
    const hourlyData = data.hourly;
    
    // Calculate averages from API data
    const validPm10 = hourlyData.pm10.filter(v => v !== null);
    const validPm25 = hourlyData.pm2_5.filter(v => v !== null);
    const validEaqi = hourlyData.european_aqi?.filter(v => v !== null) || [];

    const avgPm10 = validPm10.length > 0 
      ? validPm10.reduce((a, b) => a + b, 0) / validPm10.length 
      : 0;
    const avgPm25 = validPm25.length > 0 
      ? validPm25.reduce((a, b) => a + b, 0) / validPm25.length 
      : 0;
    const avgAqi = validEaqi.length > 0
      ? Math.round(validEaqi.reduce((a, b) => a + b, 0) / validEaqi.length)
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
      aqi: avgAqi,
      aqiCategory: getAQICategory(avgAqi),
      pollutantBreakdown: {
        pm25: avgPm25,
        pm10: avgPm10
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
 * Gets the average AQI from live API.
 * Unified interface for the hooks.
 */
export const getLiveAQI = async (latitude, longitude, startDate, endDate) => {
  const data = await fetchHistoricalAirQuality(latitude, longitude, startDate, endDate);
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch live AQI data');
  }

  return {
    aqi: data.aqi,
    aqiCategory: data.aqiCategory,
    pollutantBreakdown: data.pollutantBreakdown
  };
};

