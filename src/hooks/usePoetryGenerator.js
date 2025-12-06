/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom hook for poetry generation
 * 
 * Now returns structured output with poem, citations, and literary influences.
 */
import { useState, useCallback } from "react";
import { generatePoetry } from "../services/poetry.service";
import { generateOfflineFallbackPoem } from "../utils/offlineFallback";

export const usePoetryGenerator = () => {
  const [poem, setPoem] = useState("");
  const [citations, setCitations] = useState([]);
  const [literaryInfluences, setLiteraryInfluences] = useState([]);
  const [environmentalSources, setEnvironmentalSources] = useState([]);
  const [environmentalContext, setEnvironmentalContext] = useState(null);
  const [searchQueries, setSearchQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (options) => {
    setLoading(true);
    setError(null);

    try {
      const result = await generatePoetry(options);
      
      // Set all structured data
      setPoem(result.poem);
      setCitations(result.citations || []);
      setLiteraryInfluences(result.literaryInfluences || []);
      setEnvironmentalSources(result.environmentalSources || []);
      setEnvironmentalContext(result.environmentalContext || null);
      setSearchQueries(result.searchQueries || []);
      
      return result;
    } catch (err) {
      console.error("Error generating poem:", err);

      // Check if there's a fallback poem in the error
      if (err.cause && err.cause.fallbackPoem) {
        setPoem(err.cause.fallbackPoem);
        setCitations(err.cause.citations || []);
        setLiteraryInfluences(err.cause.literaryInfluences || []);
        setEnvironmentalSources(err.cause.environmentalSources || []);
        setEnvironmentalContext(err.cause.environmentalContext || null);
        setSearchQueries([]);
        setError(`Error using Google AI. Displaying a locally generated poem instead.`);
        return { poem: err.cause.fallbackPoem, citations: [] };
      } else {
        // Generate fallback poem directly
        const { poemType, city, aqi, aqiCategory, pollutantBreakdown, fromDate, toDate, length } = options;
        const fallbackPoem = generateOfflineFallbackPoem(
          poemType,
          city,
          aqi,
          aqiCategory,
          fromDate,
          toDate,
          length
        );
        setPoem(fallbackPoem);
        setCitations([]);
        setLiteraryInfluences([]);
        setEnvironmentalSources([]);
        setEnvironmentalContext({ aqi, aqiCategory, pollutantBreakdown, source: 'Open-Meteo EAQI' });
        setSearchQueries([]);
        setError(`Error: ${err.message}. Displaying a locally generated poem instead.`);
        return { poem: fallbackPoem, citations: [] };
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPoem("");
    setCitations([]);
    setLiteraryInfluences([]);
    setEnvironmentalSources([]);
    setEnvironmentalContext(null);
    setSearchQueries([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    poem,
    citations,
    literaryInfluences,
    environmentalSources,
    environmentalContext,
    searchQueries,
    loading,
    error,
    generate,
    reset,
  };
};
