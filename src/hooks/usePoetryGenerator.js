/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom hook for poetry generation
 */
import { useState, useCallback } from "react";
import { generatePoetry } from "../services/poetry.service";
import { generateOfflineFallbackPoem } from "../utils/offlineFallback";

export const usePoetryGenerator = () => {
  const [poem, setPoem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (options) => {
    setLoading(true);
    setError(null);

    try {
      const poemText = await generatePoetry(options);
      setPoem(poemText);
      return poemText;
    } catch (err) {
      console.error("Error generating poem:", err);

      // Check if there's a fallback poem in the error
      if (err.cause && err.cause.fallbackPoem) {
        setPoem(err.cause.fallbackPoem);
        setError(`Error using Google AI. Displaying a locally generated poem instead.`);
        return err.cause.fallbackPoem;
      } else {
        // Generate fallback poem directly
        const { poemType, city, pollutant, avgPollutionRate, fromDate, toDate, length } = options;
        const fallbackPoem = generateOfflineFallbackPoem(
          poemType,
          city,
          pollutant,
          avgPollutionRate,
          fromDate,
          toDate,
          length
        );
        setPoem(fallbackPoem);
        setError(`Error: ${err.message}. Displaying a locally generated poem instead.`);
        return fallbackPoem;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPoem("");
    setError(null);
    setLoading(false);
  }, []);

  return {
    poem,
    loading,
    error,
    generate,
    reset,
  };
};
