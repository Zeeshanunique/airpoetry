/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom hook for managing pollution data with data source toggle
 * Supports both Historical (JSON files) and Live (API) data sources.
 * Returns unified AQI values.
 */
import { useState, useEffect, useCallback } from "react";
import { 
  loadCityAQIData, 
  calculateAQIForDateRange 
} from "../services/pollutionData.service";
import { getLiveAQI } from "../services/liveAirQuality.service";
import { geocodeCity } from "../services/geocoding.service";

// Data source modes
export const DATA_SOURCE = {
  HISTORICAL: 'historical',
  LIVE: 'live'
};

export const usePollutionDataWithToggle = (city, fromDate, toDate, dataSource = DATA_SOURCE.HISTORICAL) => {
  const [aqi, setAqi] = useState(0);
  const [aqiCategory, setAqiCategory] = useState(null);
  const [pollutantBreakdown, setPollutantBreakdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  
  // For historical data caching
  const [pm10Data, setPm10Data] = useState([]);
  const [pm25Data, setPm25Data] = useState([]);

  // Load data based on the selected source
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (dataSource === DATA_SOURCE.HISTORICAL) {
        // Load both PM10 and PM2.5 data for AQI calculation
        const { pm10Data: pm10, pm25Data: pm25 } = await loadCityAQIData(city);
        setPm10Data(pm10);
        setPm25Data(pm25);
        
        if (pm10.length > 0 && pm25.length > 0 && fromDate && toDate) {
          const result = calculateAQIForDateRange(pm10, pm25, fromDate, toDate);
          setAqi(result.aqi);
          setAqiCategory(result.aqiCategory);
          setPollutantBreakdown(result.pollutantBreakdown);
        }
        
        setLocationInfo({
          source: 'Historical Data (JSON)',
          city,
          dataPoints: pm10.length
        });
      } else {
        // Use Live API data
        const geoResult = await geocodeCity(city);
        
        if (!geoResult.success) {
          throw new Error(geoResult.error || `Could not find location: ${city}`);
        }

        const { latitude, longitude, country } = geoResult;
        
        // Format dates for API
        const startDate = fromDate.toISOString().split('T')[0];
        const endDate = toDate.toISOString().split('T')[0];
        
        // Fetch live AQI data
        const result = await getLiveAQI(latitude, longitude, startDate, endDate);
        
        setAqi(result.aqi);
        setAqiCategory(result.aqiCategory);
        setPollutantBreakdown(result.pollutantBreakdown);
        
        setLocationInfo({
          source: 'Live API (Open-Meteo)',
          city,
          country,
          latitude,
          longitude,
          period: `${startDate} to ${endDate}`
        });
      }
    } catch (err) {
      setError(err.message);
      console.error("Error loading pollution data:", err);
    } finally {
      setLoading(false);
    }
  }, [city, fromDate, toDate, dataSource]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Recalculate AQI when dates change (for historical data)
  useEffect(() => {
    if (dataSource === DATA_SOURCE.HISTORICAL && pm10Data.length > 0 && pm25Data.length > 0 && fromDate && toDate) {
      const result = calculateAQIForDateRange(pm10Data, pm25Data, fromDate, toDate);
      setAqi(result.aqi);
      setAqiCategory(result.aqiCategory);
      setPollutantBreakdown(result.pollutantBreakdown);
    }
  }, [pm10Data, pm25Data, fromDate, toDate, dataSource]);

  return {
    aqi,
    aqiCategory,
    pollutantBreakdown,
    loading,
    error,
    locationInfo,
    reload: loadData,
    dataSource,
    // Legacy compatibility
    avgPollutionRate: aqi
  };
};

