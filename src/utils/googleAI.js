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
import { GOOGLE_AI_MODEL } from './config';
import { generateConstraints } from './constraintEngine';

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
   * @returns {Promise<Object>} Object containing the generated poem text and audit trail.
   */
  async generatePoem(options) {
    const { poemType, city, pollutant, length = 14, avgPollutionRate, fromDate, toDate } = options;
    
    // Format dates
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // [INVENTIVE STEP] Use the Constraint Engine to mathematically determine the output parameters
    const constraints = generateConstraints({ avgPollutionRate, poemType, city });

    // [ENHANCED] Build prompt with dynamic imagery from vocabulary constraints
    const imageryHints = constraints.vocabulary.imagery 
      ? `\n    [IMAGERY GUIDANCE]: Consider incorporating imagery such as: ${constraints.vocabulary.imagery.join(', ')}.`
      : '';

    // Base prompt construction using the generated constraints
    let prompt = `
    Compose a ${poemType.toLowerCase()} about ${city}, reflecting on its unique atmosphere, history, and culture. 
    The poem must be ${length} lines long.
    The poem should be inspired by the average pollution rate of ${avgPollutionRate.toFixed(2)} ${pollutant} recorded between ${formattedStartDate} and ${formattedEndDate}. 
    Use vivid imagery and metaphors to illustrate the city's beauty and the subtle impacts of pollution on its environment and people. 
    
    [SEMANTIC CONSTRAINT]: The tone of the poem must be ${constraints.tone}.
    [LEXICAL CONSTRAINT]: Avoid using the words: ${constraints.vocabulary.forbidden.join(', ')}.
    [LEXICAL CONSTRAINT]: Emphasize concepts like: ${constraints.vocabulary.emphasized.join(', ')}.${imageryHints}
    
    Capture the essence of ${city}, its resilience, and the daily life of its inhabitants in a manner that is both engaging and evocative.
    
    Requirements:
    - The poem must contain ${length} lines total
    - It must follow the style conventions of a ${poemType.toLowerCase()}
    `;

    // Append structural template from constraint engine
    if (constraints.structure) {
      prompt += constraints.structure;
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
        // Return poem text (audit trail is available in constraints object if needed)
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
