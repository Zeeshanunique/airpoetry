/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Cloud, BookOpen, Sparkles, AlertCircle, RefreshCw, Keyboard } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast";
import { useDateRangeValidation } from "../ui/form-validation";
import GeneratorControls from "./GeneratorControls";
import PollutionDisplay from "./PollutionDisplay";
import PoemDisplay from "./PoemDisplay";
import { usePollutionData } from "../../hooks/usePollutionData";
import { usePoetryGenerator } from "../../hooks/usePoetryGenerator";
import { useTranslation } from "../../hooks/useTranslation";
import { useKeyboardShortcuts, useShortcutHints } from "../../hooks/useKeyboardShortcuts";
import { downloadPoem, sharePoem } from "../../services/poetry.service";
import { POEM_TYPES, POEM_LENGTHS, POLLUTANTS } from "../../constants/poemTypes";
import { GOOGLE_API_KEY } from "../../utils/config";

const PoetryGeneratorRefactored = () => {
  // Form state
  const [poemType, setPoemType] = useState(POEM_TYPES.SONNET);
  const [city, setCity] = useState("Bergamo");
  const [pollutant, setPollutant] = useState(POLLUTANTS.PM10);
  // Use explicit year, month (0-indexed), day to avoid timezone issues
  const [fromDate, setFromDate] = useState(new Date(2022, 0, 1));
  const [toDate, setToDate] = useState(new Date(2023, 11, 31));
  const [poemLength, setPoemLength] = useState(POEM_LENGTHS[POEM_TYPES.SONNET]);
  const [feedbackText, setFeedbackText] = useState("");
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Toast notifications
  const toast = useToast();

  // Date range validation
  const { errors: dateErrors, isValid: isDateRangeValid } = useDateRangeValidation(fromDate, toDate);

  // Keyboard shortcut hints
  const { shortcuts: shortcutHints } = useShortcutHints();
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Custom hooks
  const { avgPollutionRate } = usePollutionData(city, pollutant, fromDate, toDate);
  const { poem, loading: poemLoading, error: poemError, generate } = usePoetryGenerator();
  const { translatedText, loading: translationLoading, translate } = useTranslation(poem);
  const [translationLanguage, setTranslationLanguage] = useState("original");

  // Update poem length based on poem type
  useEffect(() => {
    setPoemLength(POEM_LENGTHS[poemType] || 14);
  }, [poemType]);

  const handleGeneratePoem = useCallback(async () => {
    // Validate date range before generating
    if (!isDateRangeValid) {
      toast.error("Please fix the date range errors before generating");
      return;
    }

    try {
      await generate({
        poemType,
        city,
        pollutant,
        avgPollutionRate,
        fromDate: fromDate.toISOString().split("T")[0],
        toDate: toDate.toISOString().split("T")[0],
        length: poemLength,
        apiKey: GOOGLE_API_KEY,
      });
      // Show success animation briefly
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 2000);
      toast.success("Your poem has been created!", { title: "Poem Generated" });
    } catch (error) {
      toast.error("Failed to generate poem. Please try again.", {
        action: {
          label: "Retry",
          onClick: handleGeneratePoem,
        },
      });
    }
  }, [poemType, city, pollutant, avgPollutionRate, fromDate, toDate, poemLength, generate, isDateRangeValid, toast]);

  const handleDownload = useCallback(() => {
    const poemToDownload = translatedText || poem;
    downloadPoem(poemToDownload, city, fromDate, toDate);
    toast.success("Poem downloaded to your device", { title: "Download Complete" });
  }, [poem, translatedText, city, fromDate, toDate, toast]);

  const handleShare = useCallback(async () => {
    const poemToShare = translatedText || poem;
    try {
      await sharePoem(poemToShare);
      toast.success("Poem shared successfully!");
    } catch (error) {
      toast.error(error.message || "Unable to share. Try copying the poem instead.");
    }
  }, [poem, translatedText, toast]);

  const handleTranslate = useCallback(async () => {
    try {
      await translate(translationLanguage);
      if (translationLanguage !== "original") {
        toast.success(`Translated to ${translationLanguage}`, { title: "Translation Complete" });
      }
    } catch (error) {
      toast.error("Translation failed. Please try again.");
    }
  }, [translationLanguage, translate, toast]);

  const handleLanguageChange = useCallback((language) => {
    setTranslationLanguage(language);
  }, []);

  const handleFeedbackSubmit = useCallback(() => {
    if (feedbackText.trim()) {
      // Feedback submission logic would go here
      toast.success("Thank you for your feedback!", { title: "Feedback Submitted" });
      setFeedbackText("");
    }
  }, [feedbackText, toast]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+g': () => {
      if (!poemLoading && isDateRangeValid) {
        handleGeneratePoem();
      }
    },
    'ctrl+d': () => {
      if (poem) {
        handleDownload();
      }
    },
    'ctrl+shift+t': () => {
      if (poem && translationLanguage !== 'original') {
        handleTranslate();
      }
    },
    '?': () => setShowShortcuts(prev => !prev),
  });

  const displayPoem = translatedText || poem;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-green-50 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute top-1/3 -left-16 w-64 h-64 rounded-full bg-forest-green/10 opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full bg-yellow-100 opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-forest-green/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 relative"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-cream/30 z-0"></div>
        <div className="flex justify-center items-center z-10">
          <h1 className="text-3xl md:text-4xl font-serif text-center mb-6 text-primary relative z-10">
            AI(R) Poetry Generator
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <Cloud className="h-12 w-12 text-gray-200" />
          </div>
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/4 -translate-y-1/2 z-0">
            <BookOpen className="h-8 w-8 text-gray-200" />
          </div>
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/4 -translate-y-1/2 z-0">
            <Sparkles className="h-8 w-8 text-gray-200" />
          </div>
        </div>
        <p className="text-center text-gray-600 max-w-3xl mx-auto relative z-10">
          Create AI-generated poetry inspired by air pollution data from various cities. The
          intersection of technology, literature, and environmental awareness.
        </p>

        {/* Keyboard shortcuts hint */}
        <motion.div 
          className="flex justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowShortcuts(prev => !prev)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            <Keyboard size={12} />
            Press ? for keyboard shortcuts
          </button>
        </motion.div>

        {/* Keyboard shortcuts panel */}
        <AnimatePresence>
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg p-4 shadow-xl"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-sm">Keyboard Shortcuts</h3>
                <button 
                  onClick={() => setShowShortcuts(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Generate poem</span>
                  <kbd className="px-2 py-0.5 bg-gray-700 rounded text-xs">{shortcutHints.generate}</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Download poem</span>
                  <kbd className="px-2 py-0.5 bg-gray-700 rounded text-xs">{shortcutHints.download}</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Translate</span>
                  <kbd className="px-2 py-0.5 bg-gray-700 rounded text-xs">Ctrl+Shift+T</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Toggle shortcuts</span>
                  <kbd className="px-2 py-0.5 bg-gray-700 rounded text-xs">?</kbd>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 relative"
      >
        <div className="absolute -left-6 -top-6 text-primary/5 z-0">
          <Leaf className="h-20 w-20 rotate-45 animate-float" />
        </div>

        <Card className="border border-primary/20 shadow-xl bg-gradient-to-br from-white to-cream/40 backdrop-blur relative overflow-hidden z-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 z-0"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-10 -mb-10 z-0"></div>

          <CardContent className="pt-8 pb-8 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <div className="w-1.5 h-12 bg-primary rounded-full mr-4"></div>
                <h2 className="text-2xl font-serif text-primary">
                  How the AI(R) Poetry Generator Works
                </h2>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 group transition-all"
                onClick={() => setIsExplanationVisible(!isExplanationVisible)}
              >
                {isExplanationVisible ? "Hide" : "Show"}
              </Button>
            </div>

            <AnimatePresence>
              {isExplanationVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-2">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="group h-full bg-white/80 backdrop-blur p-6 rounded-xl shadow-md border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all transform hover:-translate-y-1"
                    >
                      <div className="mb-4 flex justify-between items-start">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Leaf className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-serif text-primary mb-3">
                        Data Collection
                      </h3>
                      <div className="h-0.5 w-12 bg-primary/30 mb-4 group-hover:w-16 transition-all"></div>
                      <p className="text-gray-700 leading-relaxed">
                        We gather historical air pollution data (PM10, PM2.5, NO2) from monitoring
                        stations in selected cities. This data forms the environmental context that
                        inspires our AI poetry generation system.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="group h-full bg-white/80 backdrop-blur p-6 rounded-xl shadow-md border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all transform hover:-translate-y-1"
                    >
                      <div className="mb-4 flex justify-between items-start">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-serif text-primary mb-3">
                        AI Processing
                      </h3>
                      <div className="h-0.5 w-12 bg-primary/30 mb-4 group-hover:w-16 transition-all"></div>
                      <p className="text-gray-700 leading-relaxed">
                        Using Google Gemini AI, we process the pollution data to generate unique
                        poems that reflect environmental conditions and our relationship with nature.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="group h-full bg-white/80 backdrop-blur p-6 rounded-xl shadow-md border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all transform hover:-translate-y-1"
                    >
                      <div className="mb-4 flex justify-between items-start">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-serif text-primary mb-3">
                        Creative Output
                      </h3>
                      <div className="h-0.5 w-12 bg-primary/30 mb-4 group-hover:w-16 transition-all"></div>
                      <p className="text-gray-700 leading-relaxed">
                        The AI creates poetry in various forms (Sonnet, Ode, Free Verse) that
                        reflects the environmental conditions. Each poem is a unique reflection on
                        our relationship with the environment.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Generator Interface */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column */}
        <div className="space-y-6">
          <Card className="border border-primary/20 shadow-xl bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-primary/20"></div>
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center mb-7">
                <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
                <h2 className="text-xl font-serif text-primary">
                  Poetry Generation Controls
                </h2>
              </div>

              <GeneratorControls
                poemType={poemType}
                setPoemType={setPoemType}
                poemLength={poemLength}
                setPoemLength={setPoemLength}
                city={city}
                setCity={setCity}
                pollutant={pollutant}
                setPollutant={setPollutant}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                onGenerate={handleGeneratePoem}
                loading={poemLoading}
                dateErrors={dateErrors}
                isDateRangeValid={isDateRangeValid}
              />

              <PollutionDisplay avgPollutionRate={avgPollutionRate} pollutant={pollutant} />

              {/* Enhanced Error Display */}
              <AnimatePresence>
                {poemError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200 mt-4"
                  >
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium mb-1">Generation Failed</p>
                        <p className="text-red-600">{poemError}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-red-700 hover:text-red-800 hover:bg-red-100 p-0 h-auto"
                          onClick={handleGeneratePoem}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <PoemDisplay
            poem={displayPoem}
            loading={poemLoading}
            pollutant={pollutant}
            city={city}
            fromDate={fromDate}
            toDate={toDate}
            avgPollutionRate={avgPollutionRate}
            onDownload={handleDownload}
            onShare={handleShare}
            showSuccessAnimation={showSuccessAnimation}
            translationLanguage={translationLanguage}
            onLanguageChange={handleLanguageChange}
            onTranslate={handleTranslate}
            translationLoading={translationLoading}
            feedbackText={feedbackText}
            onFeedbackChange={(e) => setFeedbackText(e.target.value)}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PoetryGeneratorRefactored;
