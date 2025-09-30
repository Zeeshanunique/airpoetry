/**
 * Google Generative AI integration using official @google/genai SDK
 */
import { GoogleGenAI } from '@google/genai';
import { SONNET_TEMPLATE, ODE_TEMPLATE, FREE_VERSE_TEMPLATE } from './poetryTypes';
import { GOOGLE_AI_MODEL } from './config';

// Create a class to handle Google Generative AI integration
export class GoogleGenerativeAI {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("API key is required for GoogleGenerativeAI");
    }
    this.apiKey = apiKey;
    this.model = GOOGLE_AI_MODEL;
    this.ai = new GoogleGenAI({ apiKey: this.apiKey });
    console.log("GoogleGenerativeAI initialized with model:", this.model);
  }

  /**
   * Generate a poem using Google Generative AI
   */
  async generatePoem(options) {
    const { poemType, city, pollutant, length = 14, avgPollutionRate, fromDate, toDate } = options;
    
    console.log("Generating poem with options:", { poemType, city, pollutant, length, avgPollutionRate });
    
    // Format dates
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Determine tone based on pollution rate
    const tone = avgPollutionRate < 12 ? "pleasing" :
                 avgPollutionRate < 36 ? "low criticism" :
                 avgPollutionRate < 56 ? "moderate and critical" :
                 "more critical and rough";

    // Base prompt
    let prompt = `
    Compose a ${poemType.toLowerCase()} about ${city}, reflecting on its unique atmosphere, history, and culture. 
    The poem must be ${length} lines long.
    The poem should be inspired by the average pollution rate of ${avgPollutionRate.toFixed(2)} ${pollutant} recorded between ${formattedStartDate} and ${formattedEndDate}. 
    Use vivid imagery and metaphors to illustrate the city's beauty and the subtle impacts of pollution on its environment and people. 
    The tone of the poem should be ${tone}, avoiding any overtly negative language and refraining from using the word 'smog'. 
    Capture the essence of ${city}, its resilience, and the daily life of its inhabitants in a manner that is both engaging and evocative.
    
    Requirements:
    - The poem must contain ${length} lines total
    - It must follow the style conventions of a ${poemType.toLowerCase()}
    `;

    // Add template specific to poem type
    switch(poemType) {
      case "Sonnet":
        prompt += SONNET_TEMPLATE;
        break;
      case "Ode":
        prompt += ODE_TEMPLATE;
        break;
      case "Free Verse":
        prompt += FREE_VERSE_TEMPLATE;
        break;
      default:
        break;
    }

    console.log("Prepared prompt for Google AI");
    
    // Call Google Generative AI API using official SDK
    try {
      console.log("Making API request using official SDK");
      
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      });

      console.log("API response received successfully");
      console.log("Full response:", response);
      console.log("Response candidates:", response.candidates);
      
      // Extract the poem text from the response
      let poemText = null;
      
      // Try to get text from response.text first (if available)
      if (response.text) {
        poemText = response.text;
        console.log("Found text in response.text:", poemText);
      }
      // Otherwise, extract from candidates array
      else if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        console.log("First candidate:", candidate);
        
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          poemText = candidate.content.parts[0].text;
          console.log("Found text in candidate.content.parts[0].text:", poemText);
        } else if (candidate.text) {
          poemText = candidate.text;
          console.log("Found text in candidate.text:", poemText);
        } else {
          console.log("Candidate structure:", JSON.stringify(candidate, null, 2));
        }
      }
      
      if (poemText) {
        console.log("Successfully extracted poem text from response");
        return poemText;
      } else {
        console.error("No text found in response. Full response structure:");
        console.error(JSON.stringify(response, null, 2));
        throw new Error("No poem text found in Google AI API response");
      }
    } catch (error) {
      console.error("Error generating poem with Google AI:", error);
      throw error;
    }
  }
} 