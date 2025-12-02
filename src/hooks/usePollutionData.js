/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom hook for managing pollution data
 */
import { useState, useEffect, useCallback } from "react";
import { loadPollutionData, calculateAvgPollutionRate } from "../services/pollutionData.service";

export const usePollutionData = (city, pollutant, fromDate, toDate) => {
  const [pollutionData, setPollutionData] = useState([]);
  const [avgPollutionRate, setAvgPollutionRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loadPollutionData(city, pollutant);
      setPollutionData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading pollution data:", err);
    } finally {
      setLoading(false);
    }
  }, [city, pollutant]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (pollutionData.length > 0 && fromDate && toDate) {
      const avgRate = calculateAvgPollutionRate(pollutionData, fromDate, toDate);
      setAvgPollutionRate(avgRate);
    }
  }, [pollutionData, fromDate, toDate]);

  return {
    pollutionData,
    avgPollutionRate,
    loading,
    error,
    reload: loadData,
  };
};
