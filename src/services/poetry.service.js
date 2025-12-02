/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Service for poetry generation
 */
import { GoogleGenerativeAI } from "../utils/googleAI";
import { generateOfflineFallbackPoem } from "../utils/offlineFallback";
import { GOOGLE_API_KEY } from "../utils/config";

/**
 * Generate poetry using Google AI or fallback to mock generator
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
    console.error("Error generating poem with Google AI:", error);

    // Fallback to offline resilience mode
    const mockPoem = generateOfflineFallbackPoem(
      poemType,
      city,
      pollutant,
      avgPollutionRate,
      fromDate,
      toDate,
      poemLength
    );

    throw new Error(
      `Error using Google AI: ${error.message}. Fallback poem available.`,
      { cause: { fallbackPoem: mockPoem } }
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
