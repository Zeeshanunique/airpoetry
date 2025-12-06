/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { 
  Download, Share2, BookOpen, Wind, Copy, Check, Globe, MessageSquare,
  Library, Link2, ExternalLink, Sparkles, Leaf
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PoemLoadingState } from "../ui/loading-states";
import { TranslationLoadingState } from "../ui/loading-states";
import { SuccessCelebration } from "../ui/success-animation";
import { TRANSLATION_LANGUAGES } from "../../constants/poemTypes";

const PoemDisplay = ({
  poem,
  loading,
  city,
  fromDate,
  toDate,
  aqi = 0,
  aqiCategory,
  onDownload,
  onShare,
  showSuccessAnimation = false,
  // Citation props (from Google Search grounding)
  citations = [],
  literaryInfluences = [],
  environmentalSources = [],
  searchQueries = [],
  // Translation props
  translationLanguage,
  onLanguageChange,
  onTranslate,
  translationLoading = false,
  // Feedback props
  feedbackText = "",
  onFeedbackChange,
  onFeedbackSubmit,
}) => {
  const [copied, setCopied] = useState(false);
  const maxFeedbackLength = 500;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(poem);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="border border-primary/20 shadow-xl bg-white h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-primary/10"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/5 rounded-full"></div>

      <CardContent className="pt-8 pb-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
            <h2 className="text-xl font-serif text-primary">
              {poem ? "Generated Poetry" : "Poetry Will Appear Here"}
            </h2>
          </div>

          {poem && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyToClipboard}
                className="text-primary hover:text-primary/80 border border-transparent hover:border-primary/20 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDownload}
                className="text-primary hover:text-primary/80 border border-transparent hover:border-primary/20 transition-all"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onShare}
                className="text-primary hover:text-primary/80 border border-transparent hover:border-primary/20 transition-all"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {/* Success Animation Overlay */}
          {showSuccessAnimation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg"
            >
              <SuccessCelebration
                title="Poem Created!"
                message="Your AI-generated poem is ready"
              />
            </motion.div>
          )}

          {!poem && !loading ? (
            <motion.div
              className="flex flex-col items-center justify-center h-[400px] text-gray-400 bg-gradient-to-b from-gray-50/50 to-white rounded-lg border border-gray-100/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 text-gray-200 animate-float">
                  <BookOpen className="w-full h-full" />
                </div>
                <div className="absolute inset-0 text-gray-300/30 animate-pulse">
                  <Wind className="w-full h-full" />
                </div>
              </div>

              <p className="text-center mb-3 text-gray-500 font-serif text-lg">
                Your AI-generated poem will appear here
              </p>

              <p className="text-center text-sm text-gray-400 max-w-sm">
                Select your poetry form, city, and date range, then click
                &quot;Generate Poem&quot; to create your unique environmentally-inspired poem
              </p>

              <div className="mt-8 flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-300 mx-1 animate-pulse"></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-300 mx-1 animate-pulse"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-300 mx-1 animate-pulse"
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
            </motion.div>
          ) : loading ? (
            <PoemLoadingState />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="relative bg-cream/30 p-8 rounded-lg border border-parchment/20 shadow-inner poem-display">
                <div className="absolute top-4 left-3 text-forest-green/10 transform -rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <pre
                  className="font-serif whitespace-pre-wrap text-lg leading-relaxed text-gray-800 mt-6"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {poem}
                </pre>

                <div className="absolute bottom-4 right-3 text-forest-green/10 transform rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c-2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>

                <div className="text-right mt-3 text-gray-500 italic text-sm">
                  — Generated by AI(R) Poetry
                </div>
              </div>

              {/* Literary Influences Section */}
              {literaryInfluences.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-5 bg-amber-50/50 rounded-lg border border-amber-200/50"
                >
                  <div className="flex items-start">
                    <Library className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="w-full">
                      <h4 className="text-sm font-semibold text-amber-800 mb-3">
                        📚 Literary Influences
                      </h4>
                      <ul className="space-y-3">
                        {literaryInfluences.map((source, idx) => (
                          <li key={idx} className="text-sm">
                            <div className="flex items-start">
                              <span className="text-amber-600 mr-2 mt-0.5">•</span>
                              <div className="flex-1">
                                <span className="font-medium text-amber-900">{source.title}</span>
                                {source.uri && (
                                  <a 
                                    href={source.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="ml-2 text-amber-600 hover:text-amber-700 inline-flex items-center"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                                {source.description && (
                                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                                    {source.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Environmental Context Section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-5 bg-primary/5 rounded-lg border border-primary/20"
              >
                <div className="flex items-start">
                  <Leaf className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div className="w-full">
                    <h4 className="text-sm font-semibold text-primary mb-3">
                      🌍 Environmental Context
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">AQI:</span>
                        <span 
                          className="font-bold px-2 py-0.5 rounded text-white text-sm"
                          style={{ backgroundColor: aqiCategory?.color || '#22c55e' }}
                        >
                          {Math.round(aqi)}
                        </span>
                        <span 
                          className="ml-2 text-sm font-medium"
                          style={{ color: aqiCategory?.color || '#22c55e' }}
                        >
                          ({aqiCategory?.label || 'Good'})
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Source: Open-Meteo EAQI
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Data from <span className="font-semibold">{city}</span> between{" "}
                      <span className="font-medium">{format(fromDate, "PPP")}</span> and{" "}
                      <span className="font-medium">{format(toDate, "PPP")}</span>.
                    </p>
                    {environmentalSources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-primary/10">
                        <span className="text-xs text-gray-500 font-medium">Research Context:</span>
                        <ul className="mt-2 space-y-2">
                          {environmentalSources.map((source, idx) => (
                            <li key={idx} className="text-xs">
                              <div className="flex items-start">
                                <span className="text-primary/50 mr-1.5 mt-0.5">•</span>
                                <div>
                                  <span className="font-medium text-gray-700">{source.title}</span>
                                  {source.uri && (
                                    <a 
                                      href={source.uri} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="ml-1 text-primary/60 hover:text-primary inline-flex items-center"
                                    >
                                      <ExternalLink className="h-2.5 w-2.5" />
                                    </a>
                                  )}
                                  {source.description && (
                                    <p className="text-gray-500 mt-0.5 leading-relaxed">
                                      {source.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Citations Section */}
              {citations.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-5 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start">
                    <Link2 className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="w-full">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        🔗 Citations
                      </h4>
                      <ol className="space-y-2">
                        {citations.map((citation, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <span className="text-gray-400 mr-2 font-mono text-xs">[{citation.id}]</span>
                            <div className="flex-1">
                              <span className="text-gray-700">{citation.title}</span>
                              {citation.domain && (
                                <span className="text-gray-400 text-xs ml-2">
                                  ({citation.domain})
                                </span>
                              )}
                              {citation.uri && (
                                <a 
                                  href={citation.uri} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="ml-2 text-blue-500 hover:text-blue-600 inline-flex items-center"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                      {searchQueries.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="text-xs text-gray-400">Search queries used:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {searchQueries.map((query, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500"
                              >
                                {query}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Translation & Feedback Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Translation Section */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Globe className="h-4 w-4 text-primary mr-2" />
                    <h4 className="text-sm font-semibold text-primary">
                      Translation
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <Select value={translationLanguage} onValueChange={onLanguageChange}>
                      <SelectTrigger className="w-full border-gray-300 focus:border-primary shadow-sm h-9">
                        <SelectValue>
                          {translationLanguage ? translationLanguage : "Select language"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TRANSLATION_LANGUAGES.ORIGINAL}>Original</SelectItem>
                        <SelectItem value={TRANSLATION_LANGUAGES.SPANISH}>Spanish</SelectItem>
                        <SelectItem value={TRANSLATION_LANGUAGES.FRENCH}>French</SelectItem>
                        <SelectItem value={TRANSLATION_LANGUAGES.GERMAN}>German</SelectItem>
                        <SelectItem value={TRANSLATION_LANGUAGES.ITALIAN}>Italian</SelectItem>
                      </SelectContent>
                    </Select>
                    {translationLoading ? (
                      <TranslationLoadingState className="h-9" />
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10 transition-colors h-9"
                        onClick={onTranslate}
                        disabled={!translationLanguage || translationLoading}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Translate
                      </Button>
                    )}
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-primary mr-2" />
                      <h4 className="text-sm font-semibold text-primary">
                        Feedback
                      </h4>
                    </div>
                    <span className={`text-xs ${(maxFeedbackLength - feedbackText.length) < 50 ? 'text-amber-600' : 'text-gray-400'}`}>
                      {maxFeedbackLength - feedbackText.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <Textarea
                      value={feedbackText}
                      onChange={onFeedbackChange}
                      placeholder="Share your thoughts about this poem..."
                      className="resize-none border-gray-200 focus:border-primary text-sm h-[68px]"
                      maxLength={maxFeedbackLength}
                    />
                    <Button
                      onClick={onFeedbackSubmit}
                      variant="outline"
                      className="w-full text-primary border-primary/30 hover:bg-primary/5 h-9"
                      disabled={!feedbackText.trim()}
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

const citationShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  uri: PropTypes.string,
  domain: PropTypes.string,
  description: PropTypes.string,
});

PoemDisplay.propTypes = {
  poem: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  city: PropTypes.string.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  aqi: PropTypes.number,
  aqiCategory: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
  }),
  onDownload: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  showSuccessAnimation: PropTypes.bool,
  // Citation props
  citations: PropTypes.arrayOf(citationShape),
  literaryInfluences: PropTypes.arrayOf(citationShape),
  environmentalSources: PropTypes.arrayOf(citationShape),
  searchQueries: PropTypes.arrayOf(PropTypes.string),
  // Translation props
  translationLanguage: PropTypes.string,
  onLanguageChange: PropTypes.func,
  onTranslate: PropTypes.func,
  translationLoading: PropTypes.bool,
  // Feedback props
  feedbackText: PropTypes.string,
  onFeedbackChange: PropTypes.func,
  onFeedbackSubmit: PropTypes.func,
};

export default React.memo(PoemDisplay);
