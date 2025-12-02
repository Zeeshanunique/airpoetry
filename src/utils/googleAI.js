/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Google Generative AI integration using official @google/genai SDK
 * 
 * This module encapsulates the proprietary method for transforming quantitative
 * environmental data into qualitative literary output.
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
  }

  /**
   * Generates a poem by transforming environmental data into natural language constraints.
   *
   * METHOD:
   * 1. Normalizes pollution data (avgPollutionRate) against standard thresholds.
   * 2. Maps the normalized value to a specific "emotional tone" (pleasing, critical, etc.).
   * 3. Constructs a prompt that enforces strict structural constraints (length, form)
   *    while allowing creative freedom within the thematic boundaries of the city and pollution data.
   * 4. Injects the specific "pollutant" type as a thematic element (invisible actor).
   *
   * @param {Object} options - The configuration for the poem generation.
   * @param {string} options.poemType - The literary form (Sonnet, Ode, Free Verse).
   * @param {string} options.city - The target location for the poem's setting.
   * @param {string} options.pollutant - The specific pollutant (PM10, PM2.5, NO2) acting as the muse.
   * @param {number} options.length - The target line count (strict constraint).
   * @param {number} options.avgPollutionRate - The calculated average pollution level used to determine tone.
   * @param {Date|string} options.fromDate - The start of the data collection period.
   * @param {Date|string} options.toDate - The end of the data collection period.
   * @returns {Promise<string>} The generated poem text.
   */
  async generatePoem(options) {
    const { poemType, city, pollutant, length = 14, avgPollutionRate, fromDate, toDate } = options;
    
    // Format dates
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Determine tone based on pollution rate
    // This mapping is a key part of the inventive step: converting data -> emotion
    const tone = avgPollutionRate < 12 ? "pleasing" :
                 avgPollutionRate < 36 ? "low criticism" :
                 avgPollutionRate < 56 ? "moderate and critical" :
                 "more critical and rough";

    // Base prompt construction
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
    
    // Call Google Generative AI API using official SDK
    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      });

      // Extract the poem text from the response
      let poemText = null;
      
      // Try to get text from response.text first (if available)
      if (response.text) {
        poemText = response.text;
      }
      // Otherwise, extract from candidates array
      else if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          poemText = candidate.content.parts[0].text;
        } else if (candidate.text) {
          poemText = candidate.text;
        }
      }
      
      if (poemText) {
        return poemText;
      } else {
        throw new Error("No poem text found in Google AI API response");
      }
    } catch (error) {
      console.error("Error generating poem with Google AI:", error);
      throw error;
    }
  }
}
