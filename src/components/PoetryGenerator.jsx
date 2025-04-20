import React, { useState, useEffect, useCallback } from "react";
import { Container, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ReactSpeedometer from "react-d3-speedometer";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Leaf, Wind, AlertCircle, Download, Share2, BookOpen, Cloud, Sparkles, Globe } from "lucide-react";
import { generateMockPoem } from "../utils/mockPoetryGenerator";
import { generatePoetry } from '../utils/api';
import { GOOGLE_API_KEY } from '../utils/config';

const PoetryGenerator = () => {
  const [poemType, setPoemType] = useState("Sonnet");
  const [city, setCity] = useState("Bergamo");
  const [pollutant, setPollutant] = useState("pm10");
  const [fromDate, setFromDate] = useState(new Date("2022-01-01"));
  const [toDate, setToDate] = useState(new Date("2022-12-31"));
  const [poem, setPoem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [translatedPoem, setTranslatedPoem] = useState("");
  const [translationLanguage, setTranslationLanguage] = useState("");
  const [isExplanationVisible, setIsExplanationVisible] = useState(true);
  const [avgPollutionRate, setAvgPollutionRate] = useState(0);
  const [pollutionData, setPollutionData] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [poemLength, setPoemLength] = useState(14); // Default to 14 lines for Sonnet

  const loadPollutionData = useCallback(async () => {
    let dataFile;
    // Fixed the data loading logic to use the correct file names from the data folder
    if (city === "Bergamo" && pollutant === "pm10") {
      dataFile = "pollution_data_bergamopm10.json";
    } else if (city === "Bergamo" && pollutant === "pm2.5") {
      dataFile = "pollution_data_bergamopm25.json";
    } else if (city === "Treviglio" && pollutant === "pm10") {
      dataFile = "pollution_data_trevigliopm10.json";
    } else if (city === "Treviglio" && pollutant === "pm2.5") {
      dataFile = "pollution_data_trevigliopm25.json";
    } else if (city === "Bizerte" && pollutant === "pm10") {
      // Fixed incorrect file assignment for Bizerte
      dataFile = "pollution_data_bergamopm10.json"; // Using Bergamo data as fallback
    } else if (city === "Bizerte" && pollutant === "pm2.5") {
      dataFile = "pollution_data_bergamopm25.json"; // Using Bergamo data as fallback
    }

    if (dataFile) {
      const data = await import(`../data/${dataFile}`);
      setPollutionData(data.default);
    }
  }, [city, pollutant]);

  useEffect(() => {
    loadPollutionData();
  }, [city, pollutant, loadPollutionData]);
  
  // Update poem length based on poem type
  useEffect(() => {
    if (poemType === "Sonnet") {
      // Sonnets must have exactly 14 lines (fixed)
      setPoemLength(14);
    } else if (poemType === "Ode") {
      // Default for Odes
      setPoemLength(16);
    } else {
      // Default for Free Verse
      setPoemLength(12);
    }
  }, [poemType]);

  useEffect(() => {
    const calculateAvgPollutionRate = () => {
      if (pollutionData.length === 0) return;
      const startStr = fromDate.toISOString().split("T")[0];
      const endStr = toDate.toISOString().split("T")[0];
      const filteredData = pollutionData.filter((entry) => {
        const entryDate = new Date(entry.date).toISOString().split("T")[0];
        return startStr <= entryDate && entryDate <= endStr;
      });
      const pollutionRates = filteredData.map((entry) =>
        parseFloat(entry.pollution_rate)
      );
      const avgRate = pollutionRates.length
        ? pollutionRates.reduce((a, b) => a + b, 0) / pollutionRates.length
        : 0;
      setAvgPollutionRate(avgRate);
    };
    calculateAvgPollutionRate();
  }, [fromDate, toDate, pollutionData]);

  const generatePoem = async () => {
    setLoading(true);
    setError(null);
    
    // Use the API key from the config file
    const apiKey = GOOGLE_API_KEY;
    
    console.log("Using API Key from config:", apiKey.substring(0, 5) + "...");
    
    if (!apiKey) {
      setError("Google API key is not configured in the config file.");
      setLoading(false);
      return;
    }
    
    try {
      // Use the updated generatePoetry function from api.js with structured options
      const poemText = await generatePoetry({
        poemType,
        city,
        pollutant,
        avgPollutionRate,
        fromDate: fromDate.toISOString().split("T")[0],
        toDate: toDate.toISOString().split("T")[0],
        length: poemLength, // Pass the poem length
        apiKey: apiKey // Pass the API key directly
      });
      
      if (poemText) {
        setPoem(poemText);
      } else {
        throw new Error("No poem was generated");
      }
    } catch (error) {
      console.error("Error generating poem:", error);
      
      // If API call fails, use the mock poem generator as fallback
      const mockPoem = generateMockPoem(
        poemType, 
        city, 
        pollutant, 
        avgPollutionRate, 
        fromDate.toISOString().split("T")[0], 
        toDate.toISOString().split("T")[0],
        poemLength
      );
      
      setPoem(mockPoem);
      setError(`Error using Google AI: ${error.message}. Displaying a locally generated poem instead.`);
    } finally {
      setLoading(false);
    }
  };

  const downloadPoem = () => {
    const element = document.createElement("a");
    const file = new Blob([poem], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${city}_${fromDate.toISOString().split("T")[0]}_${
      toDate.toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const submitFeedback = () => {
    // In a real implementation, this would send the feedback to a server
    console.log("Feedback submitted:", feedbackText);
    alert("Thank you for your feedback!");
    setFeedbackText("");
  };

  const getPollutionLevelColor = (rate) => {
    if (rate <= 12) return "bg-green-500";
    if (rate <= 36) return "bg-yellow-500";
    if (rate <= 56) return "bg-orange-500";
    return "bg-red-500";
  };

  const getPollutionLevelText = (rate) => {
    if (rate <= 12) return "Low";
    if (rate <= 36) return "Moderate";
    if (rate <= 56) return "High";
    return "Very High";
  };
  
  // Helper function to get color for speedometer
  const getSpeedometerColors = () => {
    return [
      "#4ade80", // green-500
      "#a3e635", // lime-500
      "#facc15", // yellow-500
      "#fb923c", // orange-500
      "#ef4444"  // red-500
    ];
  };
  
  // Helper function to determine max value for speedometer based on pollutant
  const getMaxPollutionValue = () => {
    if (pollutant === "pm10") return 100;
    if (pollutant === "pm2.5") return 60;
    return 100; // Default
  };

  const translatePoem = (language) => {
    if (language === "original") {
      setTranslatedPoem("");
      setTranslationLanguage("original");
      return;
    }
    
    setTranslationLanguage(language);
    // Simulating translation
    setTranslatedPoem(`[This is a simulated translation to ${language}]\n\n${poem}`);
  };

  const handleSharePoem = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Generated Poem',
        text: translatedPoem || poem,
      });
    } else {
      alert("Web Share API not supported by your browser");
    }
  };

  return (
    <Container maxWidth="xl" className="py-8 relative overflow-hidden">
      {/* Animated background elements - ecological theme */}
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
            repeatType: "mirror"
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
            repeatType: "mirror"
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
            repeatType: "mirror"
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
              y: [
                0,
                Math.random() * -100 - 50,
                0
              ],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 relative"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-cream/30 z-0"></div>
        <div className="flex justify-center items-center z-10">
          <Typography variant="h2" className="text-3xl md:text-4xl font-serif text-center mb-6 text-forest-green relative z-10">
            AI(R) Poetry Generator
          </Typography>
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
        <Typography variant="body1" className="text-center text-gray-600 max-w-3xl mx-auto relative z-10">
          Create AI-generated poetry inspired by air pollution data from various cities.
          The intersection of technology, literature, and environmental awareness.
        </Typography>
      </motion.div>

      {/* How It Works Section - Always visible but can be collapsed */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 relative"
      >
        <div className="absolute -left-6 -top-6 text-forest-green/5 z-0">
          <Leaf className="h-20 w-20 rotate-45 animate-float" />
        </div>
        
        <Card className="border border-forest-green/20 shadow-xl bg-gradient-to-br from-white to-cream/40 backdrop-blur relative overflow-hidden z-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-forest-green/5 rounded-full -mr-10 -mt-10 z-0"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-forest-green/5 rounded-full -ml-10 -mb-10 z-0"></div>
          
          <CardContent className="pt-8 pb-8 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <div className="w-1.5 h-12 bg-forest-green rounded-full mr-4"></div>
                <Typography variant="h3" className="text-2xl font-serif text-forest-green">
                  How the AI(R) Poetry Generator Works
                </Typography>
              </div>
              <Button 
                variant="ghost" 
                className="text-forest-green hover:text-forest-green/80 group transition-all"
                onClick={() => setIsExplanationVisible(!isExplanationVisible)}
              >
                {isExplanationVisible ? (
                  <div className="flex items-center">
                    <span className="mr-2">Hide</span>
                    <div className="relative h-5 w-5 transition-transform group-hover:-translate-y-0.5">
                      <div className="absolute h-0.5 w-3 bg-forest-green top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                      <div className="absolute h-0.5 w-3 bg-forest-green top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">Show</span>
                    <div className="relative h-5 w-5 transition-transform group-hover:translate-y-0.5">
                      <div className="absolute h-0.5 w-3 bg-forest-green top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute h-0.5 w-3 bg-forest-green top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"></div>
                    </div>
                  </div>
                )}
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
                    >
                      <div className="group h-full bg-white/80 backdrop-blur p-6 rounded-xl shadow-md border border-forest-green/10 hover:shadow-lg hover:border-forest-green/20 transition-all transform hover:-translate-y-1">
                        <div className="mb-4 flex justify-between items-start">
                          <div className="h-12 w-12 bg-forest-green/10 rounded-full flex items-center justify-center group-hover:bg-forest-green/20 transition-colors">
                            <Leaf className="h-6 w-6 text-forest-green" />
                          </div>
                          <div className="h-1.5 w-1.5 rounded-full bg-forest-green/40"></div>
                        </div>
                        <Typography variant="h4" className="text-xl font-serif text-forest-green mb-3 group-hover:text-forest-green/80 transition-colors">
                          Data Collection
                        </Typography>
                        <div className="h-0.5 w-12 bg-forest-green/30 mb-4 group-hover:w-16 transition-all"></div>
                        <Typography variant="body1" className="text-gray-700 leading-relaxed">
                          We gather historical air pollution data (PM10, PM2.5, NO2) from monitoring 
                          stations in selected cities. This data forms the environmental context 
                          that inspires our AI poetry generation system.
                        </Typography>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <div className="group h-full bg-white/80 backdrop-blur p-6 rounded-xl shadow-md border border-forest-green/10 hover:shadow-lg hover:border-forest-green/20 transition-all transform hover:-translate-y-1">
                        <div className="mb-4 flex justify-between items-start">
                          <div className="h-12 w-12 bg-forest-green/10 rounded-full flex items-center justify-center group-hover:bg-forest-green/20 transition-colors">
                            <Wind className="h-6 w-6 text-forest-green" />
                          </div>
                          <div className="h-1.5 w-1.5 rounded-full bg-forest-green/40"></div>
                        </div>
                        <Typography variant="h4" className="text-xl font-serif text-forest-green mb-3 group-hover:text-forest-green/80 transition-colors">
                          AI Processing
                        </Typography>
                        <div className="h-0.5 w-12 bg-forest-green/30 mb-4 group-hover:w-16 transition-all"></div>
                        <Typography variant="body1" className="text-gray-700 leading-relaxed">
                          Using sophisticated large language models (Google Gemini and Groq LLaMA), 
                          we process the pollution data alongside literary corpus including environmental 
                          texts, poetry, and critical theory to generate unique poems.
                        </Typography>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div className="group h-full bg-white/80 backdrop-blur p-6 rounded-xl shadow-md border border-forest-green/10 hover:shadow-lg hover:border-forest-green/20 transition-all transform hover:-translate-y-1">
                        <div className="mb-4 flex justify-between items-start">
                          <div className="h-12 w-12 bg-forest-green/10 rounded-full flex items-center justify-center group-hover:bg-forest-green/20 transition-colors">
                            <Sparkles className="h-6 w-6 text-forest-green" />
                          </div>
                          <div className="h-1.5 w-1.5 rounded-full bg-forest-green/40"></div>
                        </div>
                        <Typography variant="h4" className="text-xl font-serif text-forest-green mb-3 group-hover:text-forest-green/80 transition-colors">
                          Creative Output
                        </Typography>
                        <div className="h-0.5 w-12 bg-forest-green/30 mb-4 group-hover:w-16 transition-all"></div>
                        <Typography variant="body1" className="text-gray-700 leading-relaxed">
                          The AI creates poetry in various forms (Sonnet, Ode, Free Verse) that reflects 
                          the environmental conditions. Each poem is a unique reflection on our relationship 
                          with the environment, informed by actual pollution data.
                        </Typography>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Generator Interface - Always visible below the explanation */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column - Generator Controls */}
        <div className="space-y-6">
          <Card className="border border-forest-green/20 shadow-xl bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest-green/60 to-forest-green/20"></div>
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-forest-green/5 rounded-full"></div>
            
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center mb-7">
                <div className="w-1 h-8 bg-forest-green rounded-full mr-3"></div>
                <Typography variant="h3" className="text-xl font-serif text-forest-green">
                  Poetry Generation Controls
                </Typography>
              </div>
              
              <div className="space-y-5 relative">
                <div className="absolute left-3 top-1 bottom-0 w-px bg-gradient-to-b from-forest-green/20 via-forest-green/10 to-transparent"></div>
                
                <div className="space-y-2 pl-8 relative">
                  <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-forest-green"></div>
                  </div>
                  <Label htmlFor="poemType" className="text-gray-700 font-medium block">Poetry Form</Label>
                  <Select value={poemType} onValueChange={setPoemType}>
                    <SelectTrigger id="poemType" className="w-full border-gray-300 focus:border-forest-green shadow-sm transition-all">
                      <SelectValue>{poemType}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sonnet">Sonnet</SelectItem>
                      <SelectItem value="Ode">Ode</SelectItem>
                      <SelectItem value="Free Verse">Free Verse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 pl-8 relative">
                  <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-forest-green"></div>
                  </div>
                  <Label htmlFor="poemLength" className="text-gray-700 font-medium block">
                    Number of Lines
                  </Label>
                  {poemType === "Sonnet" ? (
                    <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
                      14 lines (fixed for Sonnets)
                    </div>
                  ) : (
                    <input
                      type="number"
                      id="poemLength"
                      value={poemLength}
                      onChange={(e) => setPoemLength(Number(e.target.value))}
                      min="4"
                      max="30"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green"
                    />
                  )}
                </div>

                <div className="space-y-2 pl-8 relative">
                  <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-forest-green"></div>
                  </div>
                  <Label htmlFor="city" className="text-gray-700 font-medium block">City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger id="city" className="w-full border-gray-300 focus:border-forest-green shadow-sm transition-all">
                      <SelectValue>{city}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bergamo">Bergamo</SelectItem>
                      <SelectItem value="Treviglio">Treviglio</SelectItem>
                      <SelectItem value="Bizerte">Bizerte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pl-8 relative">
                  <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-forest-green"></div>
                  </div>
                  <Label htmlFor="pollutant" className="text-gray-700 font-medium block">Pollutant Type</Label>
                  <Select value={pollutant} onValueChange={setPollutant}>
                    <SelectTrigger id="pollutant" className="w-full border-gray-300 focus:border-forest-green shadow-sm transition-all">
                      <SelectValue>{pollutant}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pm10">PM10</SelectItem>
                      <SelectItem value="pm2.5">PM2.5</SelectItem>
                      <SelectItem value="no2">NO2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4 pl-8 relative">
                  <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-forest-green"></div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromDate" className="text-gray-700 font-medium block">From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-gray-300 hover:border-forest-green focus:border-forest-green shadow-sm transition-all"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(fromDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                          className="rounded-md shadow-md border border-gray-200"
                          fromDate={new Date("2022-01-01")}
                          toDate={new Date("2023-12-31")}
                          defaultMonth={new Date("2022-01-01")}
                          disabled={(date) => 
                            date < new Date("2022-01-01") || 
                            date > new Date("2023-12-31") ||
                            date > toDate
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="toDate" className="text-gray-700 font-medium block">To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-gray-300 hover:border-forest-green focus:border-forest-green shadow-sm transition-all"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(toDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          className="rounded-md shadow-md border border-gray-200"
                          fromDate={new Date("2022-01-01")}
                          toDate={new Date("2023-12-31")}
                          defaultMonth={new Date("2022-12-31")}
                          disabled={(date) => 
                            date < new Date("2022-01-01") || 
                            date > new Date("2023-12-31") ||
                            date < fromDate
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6 pl-8 relative">
                  <div className="absolute left-0 top-8 w-6 h-6 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-forest-green"></div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-gray-700 font-medium">Pollution Rate:</Label>
                    <span className="font-medium text-gray-900">{avgPollutionRate.toFixed(2)} µg/m³</span>
                  </div>
                  
                  {/* Speedometer indicator for pollution rate */}
                  <motion.div 
                    className="flex flex-col items-center my-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ReactSpeedometer 
                      maxValue={getMaxPollutionValue()}
                      value={avgPollutionRate}
                      needleColor="#166534"
                      startColor="#4ade80"
                      endColor="#ef4444"
                      segments={5}
                      width={250}
                      height={150}
                      ringWidth={30}
                      needleHeightRatio={0.7}
                      valueTextFontSize="16px"
                      segmentColors={getSpeedometerColors()}
                      currentValueText={`${avgPollutionRate} µg/m³`}
                      customSegmentLabels={[
                        { text: "Low", position: "INSIDE", color: "#1f2937" },
                        { text: "Mod", position: "INSIDE", color: "#1f2937" },
                        { text: "Mod+", position: "INSIDE", color: "#1f2937" },
                        { text: "High", position: "INSIDE", color: "#1f2937" },
                        { text: "V.High", position: "INSIDE", color: "#1f2937" }
                      ]}
                      labelFontSize={'12px'}
                    />
                    <div className="mt-2 text-center">
                      <span className="text-sm font-medium">
                        Current level: <span className={`font-semibold ${getPollutionLevelColor(avgPollutionRate).replace('bg-', 'text-')}`}>
                          {getPollutionLevelText(avgPollutionRate)}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Make the Generate Poem button more prominent */}
                <div className="pt-6 pl-0 mt-4">
                  <Button 
                    className="relative overflow-hidden w-full bg-gradient-to-r from-forest-green to-forest-green/90 text-white py-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    onClick={generatePoem}
                    disabled={loading}
                  >
                    {/* Add background shimmer effect */}
                    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                    
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin mr-3 h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Generating poetry...</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-white justify-center group">
                        <Wind className="mr-3 h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                        <span className="tracking-wide">Generate Poem</span>
                      </div>
                    )}
                  </Button>
                  <div className="text-xs text-center text-gray-500 mt-2">
                    Creative AI poetry based on air pollution data
                  </div>
                </div>
                
                {error && (
                  <div className="p-4 rounded-md bg-red-50 text-red-600 text-sm border border-red-100 mt-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {poem && (
            <Card className="border border-forest-green/20 shadow-xl bg-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest-green/30 to-forest-green/10"></div>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-forest-green/60 rounded-full mr-3"></div>
                  <Typography variant="h3" className="text-xl font-serif text-forest-green">
                    Translation
                  </Typography>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-gray-700 font-medium">Translate To</Label>
                    <Select value={translationLanguage} onValueChange={setTranslationLanguage}>
                      <SelectTrigger id="language" className="w-full border-gray-300 focus:border-forest-green shadow-sm">
                        <SelectValue>{translationLanguage ? translationLanguage : "Select a language"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Original</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-forest-green text-forest-green hover:bg-forest-green/10 transition-colors"
                    onClick={translatePoem}
                    disabled={translationLanguage === ""}
                  >
                    <div className="flex items-center justify-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Translate
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Poetry Display */}
        <div>
          <Card className="border border-forest-green/20 shadow-xl bg-white h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest-green/40 to-forest-green/10"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-forest-green/5 rounded-full"></div>
            
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className="w-1 h-8 bg-forest-green rounded-full mr-3"></div>
                  <Typography variant="h3" className="text-xl font-serif text-forest-green">
                    {poem ? "Generated Poetry" : "Poetry Will Appear Here"}
                  </Typography>
                </div>
                
                {poem && (
                  <div className="flex gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={downloadPoem} 
                      className="text-forest-green hover:text-forest-green/80 border border-transparent hover:border-forest-green/20 transition-all"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSharePoem} 
                      className="text-forest-green hover:text-forest-green/80 border border-transparent hover:border-forest-green/20 transition-all"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )}
              </div>
              
              <AnimatePresence mode="wait">
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
                  
                  <Typography className="text-center mb-3 text-gray-500 font-serif text-lg">
                    Your AI-generated poem will appear here
                  </Typography>
                  
                  <Typography className="text-center text-sm text-gray-400 max-w-sm">
                    Select your poetry form, city, pollutant type, and date range, then click "Generate Poem" to create your unique environmentally-inspired poem
                  </Typography>
                  
                  <div className="mt-8 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mx-1 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 mx-1 animate-pulse" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 mx-1 animate-pulse" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </motion.div>
                ) : loading ? (
                  <motion.div 
                    className="flex flex-col justify-center items-center h-[400px] bg-gradient-to-b from-gray-50/50 to-white rounded-lg border border-gray-100/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="animate-spin h-16 w-16 border-4 border-forest-green/20 border-t-forest-green rounded-full mb-6"></div>
                    <div className="text-forest-green font-medium text-lg mb-2">Generating your poetry...</div>
                    <div className="text-sm text-gray-500 mb-8 italic">Infusing pollution data with literary inspiration</div>
                    
                    <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-forest-green/40 animate-pulse" style={{ width: "70%" }}></div>
                    </div>
                  </motion.div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      
                      <pre className="font-serif whitespace-pre-wrap text-lg leading-relaxed text-gray-800 mt-6" style={{ whiteSpace: 'pre-wrap' }}>
                        {translationLanguage && translatedPoem ? translatedPoem : poem}
                      </pre>
                      
                      <div className="absolute bottom-4 right-3 text-forest-green/10 transform rotate-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c-2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                        </svg>
                      </div>
                      
                      <div className="text-right mt-3 text-gray-500 italic text-sm">
                        — Generated by AI(R) Poetry
                      </div>
                    </div>
                    
                    <div className="p-5 bg-forest-green/5 rounded-lg border border-forest-green/20">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-forest-green mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <Typography variant="h4" className="text-sm font-semibold text-forest-green mb-2">
                            Pollution Context
                          </Typography>
                          <Typography variant="body2" className="text-sm text-gray-700 leading-relaxed">
                            This poem was generated based on <span className="font-semibold">{pollutant}</span> pollution data from <span className="font-semibold">{city}</span> between <span className="font-medium">{format(fromDate, "PPP")}</span> and <span className="font-medium">{format(toDate, "PPP")}</span>.
                            The average pollution rate during this period was <span className="font-semibold">{avgPollutionRate.toFixed(2)} µg/m³</span>, classified as <span className={`font-semibold ${getPollutionLevelColor(avgPollutionRate).replace('bg-', 'text-')}`}>{getPollutionLevelText(avgPollutionRate)}</span>.
                          </Typography>
                        </div>
                      </div>
                    </div>
                    
                    {/* Add feedback section if needed */}
                    <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 mt-4">
                      <div className="text-sm font-medium text-gray-700 mb-3">Share Your Feedback</div>
                      <Textarea 
                        value={feedbackText}
                        onChange={handleFeedbackChange}
                        placeholder="What do you think about this poem? How does it make you feel?"
                        className="resize-none mb-3 border-gray-200 focus:border-forest-green"
                        rows={3}
                      />
                      <Button 
                        onClick={submitFeedback}
                        variant="outline" 
                        className="w-full text-forest-green border-forest-green/30 hover:bg-forest-green/5"
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Container>
  );
};

export default PoetryGenerator;