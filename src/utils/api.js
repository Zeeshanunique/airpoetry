import { GoogleGenerativeAI } from './googleAI';
import { GOOGLE_API_KEY } from './config';

// Function to generate poetry using Google AI API
export const generatePoetry = async (options) => {
  const { poemType, city, pollutant, avgPollutionRate, fromDate, toDate, apiKey = GOOGLE_API_KEY } = options;
  
  if (!apiKey) {
    throw new Error('Google API key is required but was not provided');
  }
  
  try {
    console.log("Creating GoogleGenerativeAI instance with API key");
    
    // Create GoogleGenerativeAI instance
    const googleAI = new GoogleGenerativeAI(apiKey);
    
    console.log("Generating poem with options:", { poemType, city, pollutant, avgPollutionRate });
    
    // Generate poem using Google AI
    const poemText = await googleAI.generatePoem({
      poemType,
      city,
      pollutant,
      length: poemType === "Sonnet" ? 14 : poemType === "Ode" ? 16 : 12,
      avgPollutionRate,
      fromDate,
      toDate
    });
    
    console.log("Poem generated successfully");
    return poemText;
  } catch (error) {
    console.error('Error generating poem:', error);
    throw error;
  }
};
