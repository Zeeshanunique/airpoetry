/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom hook for managing pollution data with AQI calculation
 */
import { useState, useEffect, useCallback } from "react";
import { 
  loadCityAQIData, 
  calculateAQIForDateRange,
  getAQICategory 
} from "../services/pollutionData.service";

export const usePollutionData = (city, fromDate, toDate) => {
  const [pm10Data, setPm10Data] = useState([]);
  const [pm25Data, setPm25Data] = useState([]);
  const [aqi, setAqi] = useState(0);
  const [aqiCategory, setAqiCategory] = useState(null);
  const [pollutantBreakdown, setPollutantBreakdown] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading=true
  const [error, setError] = useState(null);
  const [dataVersion, setDataVersion] = useState(0); // Track data updates

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    // Reset AQI while loading to prevent stale data display
    setAqi(0);
    setAqiCategory(null);
    setPollutantBreakdown(null);

    try {
      const { pm10Data: pm10, pm25Data: pm25 } = await loadCityAQIData(city);
      setPm10Data(pm10);
      setPm25Data(pm25);
      setDataVersion(v => v + 1); // Trigger recalculation
    } catch (err) {
      setError(err.message);
      console.error("Error loading pollution data:", err);
    } finally {
      setLoading(false);
    }
  }, [city]);

  // Load data when city changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Calculate AQI when data or dates change
  useEffect(() => {
    if (pm10Data.length > 0 && pm25Data.length > 0 && fromDate && toDate && !loading) {
      const result = calculateAQIForDateRange(pm10Data, pm25Data, fromDate, toDate);
      setAqi(result.aqi);
      setAqiCategory(result.aqiCategory);
      setPollutantBreakdown(result.pollutantBreakdown);
    }
  }, [pm10Data, pm25Data, fromDate, toDate, loading, dataVersion]);

  return {
    aqi,
    aqiCategory,
    pollutantBreakdown,
    loading,
    error,
    reload: loadData,
    // Legacy compatibility
    avgPollutionRate: aqi,
    locationInfo: {
      source: 'Historical Data (JSON)',
      city,
    }
  };
};
