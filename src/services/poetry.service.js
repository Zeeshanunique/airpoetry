/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Service for poetry generation - Hybrid Architecture Implementation
 */
import { GoogleGenerativeAI } from "../utils/googleAI";
import { generateOfflineFallbackPoem } from "../utils/offlineFallback";
import { GOOGLE_API_KEY } from "../utils/config";

/**
 * Selects the appropriate generation engine based on system state.
 * Implements "Hybrid Resilience Architecture" (Claim 2).
 * 
 * @param {Object} options - Generation parameters.
 * @returns {Promise<string>} The generated poem.
 */
export const generatePoetry = async (options) => {
  const {
    poemType,
    city,
    pollutant,
    avgPollutionRate,
    fromDate,
    toDate,
    length,
    apiKey = GOOGLE_API_KEY,
  } = options;

  if (!apiKey) {
    throw new Error("Google API key is required but was not provided");
  }

  const poemLength = poemType === "Sonnet" ? 14 : length;

  // 1. Attempt Primary Stochastic Generation (Cloud AI)
  try {
    const googleAI = new GoogleGenerativeAI(apiKey);

    const poemText = await googleAI.generatePoem({
      poemType,
      city,
      pollutant,
      length: poemLength,
      avgPollutionRate,
      fromDate,
      toDate,
    });

    return poemText;
  } catch (error) {
    // 2. Fallback to Secondary Deterministic Generation (Local Template)
    // This "Selector Logic" ensures continuity of service (Resilience Claim).
    console.warn("Primary generation failed, switching to hybrid fallback:", error.message);

    const fallbackPoem = generateOfflineFallbackPoem(
      poemType,
      city,
      pollutant,
      avgPollutionRate,
      fromDate,
      toDate,
      poemLength
    );

    // Return the fallback poem but attach metadata indicating the source switch
    throw new Error(
      `System switched to Resilience Mode: ${error.message}`,
      { cause: { fallbackPoem } }
    );
  }
};

/**
 * Download poem as text file
 */
export const downloadPoem = (poem, city, fromDate, toDate) => {
  const element = document.createElement("a");
  const file = new Blob([poem], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `${city}_${fromDate.toISOString().split("T")[0]}_${
    toDate.toISOString().split("T")[0]
  }.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
};

/**
 * Share poem using Web Share API
 */
export const sharePoem = async (poem, title = "Generated Poem") => {
  if (!navigator.share) {
    throw new Error("Web Share API not supported by your browser");
  }

  try {
    await navigator.share({
      title: title,
      text: poem,
    });
    return true;
  } catch (error) {
    if (error.name === "AbortError") {
      // User cancelled the share
      return false;
    }
    throw error;
  }
};
