/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Service for poem translation
 */
import { translateText } from "../utils/translator";

/**
 * Translate poem to target language
 */
export const translatePoem = async (text, targetLanguage, sourceLanguage = "en") => {
  if (!text) {
    throw new Error("Text is required for translation");
  }

  if (!targetLanguage || targetLanguage === "original") {
    return text; // Return original text
  }

  try {
    const translatedText = await translateText(text, targetLanguage, sourceLanguage);
    return translatedText;
  } catch (error) {
    console.error("Translation failed:", error);
    throw new Error(`Translation failed: ${error.message}`);
  }
};

/**
 * Get language name from code
 */
export const getLanguageName = (languageCode) => {
  const languageNames = {
    original: "Original",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
  };

  return languageNames[languageCode] || languageCode;
};
