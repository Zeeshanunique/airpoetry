/**
 * Custom hook for poem translation
 */
import { useState, useCallback } from "react";
import { translatePoem } from "../services/translation.service";

export const useTranslation = (originalText) => {
  const [translatedText, setTranslatedText] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("original");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const translate = useCallback(
    async (targetLanguage) => {
      if (!targetLanguage || targetLanguage === "original") {
        setTranslatedText("");
        setCurrentLanguage("original");
        setError(null);
        return originalText;
      }

      setLoading(true);
      setError(null);

      try {
        // Use current translated text as source if translating from non-original
        const sourceText =
          translatedText && currentLanguage !== "original" ? translatedText : originalText;
        const result = await translatePoem(sourceText, targetLanguage);
        setTranslatedText(result);
        setCurrentLanguage(targetLanguage);
        return result;
      } catch (err) {
        console.error("Translation error:", err);
        setError(err.message);
        setTranslatedText(`[Translation failed, showing original]\n\n${originalText}`);
        return originalText;
      } finally {
        setLoading(false);
      }
    },
    [originalText, translatedText, currentLanguage]
  );

  const reset = useCallback(() => {
    setTranslatedText("");
    setCurrentLanguage("original");
    setError(null);
    setLoading(false);
  }, []);

  return {
    translatedText,
    currentLanguage,
    loading,
    error,
    translate,
    reset,
    displayText: translatedText || originalText,
  };
};
