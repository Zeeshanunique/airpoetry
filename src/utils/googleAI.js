/**
 * Google Generative AI direct integration for poetry generation
 */
import { SONNET_TEMPLATE, ODE_TEMPLATE, FREE_VERSE_TEMPLATE } from './poetryTypes';
import { GOOGLE_AI_MODEL, GOOGLE_AI_ENDPOINT } from './config';

// Create a class to handle Google Generative AI integration
export class GoogleGenerativeAI {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("API key is required for GoogleGenerativeAI");
    }
    this.apiKey = apiKey;
    this.model = GOOGLE_AI_MODEL;
    this.endpoint = GOOGLE_AI_ENDPOINT;
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
    
    // Call Google Generative AI API
    try {
      const apiUrl = `${this.endpoint}/${this.model}:generateContent?key=${this.apiKey}`;
      console.log("Making API request to:", apiUrl.replace(this.apiKey, "API_KEY_HIDDEN"));
      
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log("API response status:", response.status);
      
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("API error details:", errorDetails);
        throw new Error(`Google AI API Error: ${errorDetails.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("API response received successfully");
      
      // Extract the poem text from the response
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts.length > 0) {
        const poemText = data.candidates[0].content.parts[0].text;
        console.log("Successfully extracted poem text from response");
        return poemText;
      } else {
        console.error("Unexpected API response format:", data);
        throw new Error("Unexpected response format from Google AI API");
      }
    } catch (error) {
      console.error("Error generating poem with Google AI:", error);
      throw error;
    }
  }
} 