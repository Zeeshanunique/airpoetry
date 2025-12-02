/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom hook for managing pollution data with data source toggle
 * Supports both Historical (JSON files) and Live (API) data sources.
 */
import { useState, useEffect, useCallback } from "react";
import { loadPollutionData, calculateAvgPollutionRate } from "../services/pollutionData.service";
import { getLiveAvgPollutionRate } from "../services/liveAirQuality.service";
import { geocodeCity } from "../services/geocoding.service";

// Data source modes
export const DATA_SOURCE = {
  HISTORICAL: 'historical',
  LIVE: 'live'
};

export const usePollutionDataWithToggle = (city, pollutant, fromDate, toDate, dataSource = DATA_SOURCE.HISTORICAL) => {
  const [pollutionData, setPollutionData] = useState([]);
  const [avgPollutionRate, setAvgPollutionRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);

  // Load data based on the selected source
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (dataSource === DATA_SOURCE.HISTORICAL) {
        // Use existing JSON file data
        const data = await loadPollutionData(city, pollutant);
        setPollutionData(data);
        
        if (data.length > 0 && fromDate && toDate) {
          const avgRate = calculateAvgPollutionRate(data, fromDate, toDate);
          setAvgPollutionRate(avgRate);
        }
        
        setLocationInfo({
          source: 'Historical Data (JSON)',
          city,
          dataPoints: data.length
        });
      } else {
        // Use Live API data
        // First, geocode the city to get coordinates
        const geoResult = await geocodeCity(city);
        
        if (!geoResult.success) {
          throw new Error(geoResult.error || `Could not find location: ${city}`);
        }

        const { latitude, longitude, country } = geoResult;
        
        // Format dates for API
        const startDate = fromDate.toISOString().split('T')[0];
        const endDate = toDate.toISOString().split('T')[0];
        
        // Fetch live pollution data
        const avgRate = await getLiveAvgPollutionRate(
          latitude, 
          longitude, 
          pollutant, 
          startDate, 
          endDate
        );
        
        setAvgPollutionRate(avgRate);
        setPollutionData([]); // Live data doesn't return raw array
        
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
  }, [city, pollutant, fromDate, toDate, dataSource]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Recalculate average when dates change (for historical data)
  useEffect(() => {
    if (dataSource === DATA_SOURCE.HISTORICAL && pollutionData.length > 0 && fromDate && toDate) {
      const avgRate = calculateAvgPollutionRate(pollutionData, fromDate, toDate);
      setAvgPollutionRate(avgRate);
    }
  }, [pollutionData, fromDate, toDate, dataSource]);

  return {
    pollutionData,
    avgPollutionRate,
    loading,
    error,
    locationInfo,
    reload: loadData,
    dataSource
  };
};

