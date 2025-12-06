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
   * 1. Normalizes AQI data against standard thresholds.
   * 2. Maps the normalized value to a specific "emotional tone" (pleasing, critical, etc.).
   * 3. Constructs a prompt that enforces strict structural constraints (length, form)
   *    while allowing creative freedom within the thematic boundaries of the city and air quality.
   * 4. Uses AQI category to set the thematic mood of the poem.
   *
   * @param {Object} options - The configuration for the poem generation.
   * @param {string} options.poemType - The literary form (Sonnet, Ode, Free Verse).
   * @param {string} options.city - The target location for the poem's setting.
   * @param {number} options.aqi - The Air Quality Index value.
   * @param {string} options.aqiCategory - The AQI category label (Good, Moderate, Unhealthy, etc.).
   * @param {Object} options.pollutantBreakdown - Individual pollutant values {pm25, pm10}.
   * @param {number} options.length - The target line count (strict constraint).
   * @param {Date|string} options.fromDate - The start of the data collection period.
   * @param {Date|string} options.toDate - The end of the data collection period.
   * @returns {Promise<Object>} Object containing the generated poem text and audit trail.
   */
  async generatePoem(options) {
    const { poemType, city, aqi = 0, aqiCategory, pollutantBreakdown, length = 14, fromDate, toDate } = options;
    
    // Format dates
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // [INVENTIVE STEP] Use the Constraint Engine with AQI as the input
    // Converting AQI to a pollution rate proxy for constraint generation
    const avgPollutionRate = aqi; // AQI serves as our normalized metric
    const constraints = generateConstraints({ avgPollutionRate, poemType, city });

    // [ENHANCED] Build prompt with dynamic imagery from vocabulary constraints
    const imageryHints = constraints.vocabulary.imagery 
      ? `\n    [IMAGERY GUIDANCE]: Consider incorporating imagery such as: ${constraints.vocabulary.imagery.join(', ')}.`
      : '';

    // Build pollutant context if breakdown is available
    const pollutantContext = pollutantBreakdown 
      ? `(PM2.5: ${pollutantBreakdown.pm25?.toFixed(1) || 'N/A'} µg/m³, PM10: ${pollutantBreakdown.pm10?.toFixed(1) || 'N/A'} µg/m³)`
      : '';

    // Base prompt construction using AQI and generated constraints
    // Include explicit research requests to trigger Google Search grounding
    let prompt = `
    TASK: Create a ${poemType.toLowerCase()} about ${city} that combines literary tradition with environmental awareness.
    
    RESEARCH REQUIRED (use Google Search):
    1. Look up the literary and poetic traditions associated with ${city} or its region
    2. Find information about famous poets who wrote about this area or similar themes
    3. Research the environmental and air quality situation in ${city}
    4. Look up any UNESCO heritage sites or cultural landmarks in ${city}
    
    POEM SPECIFICATIONS:
    - Form: ${poemType.toLowerCase()}
    - Length: exactly ${length} lines
    - Location: ${city}
    - Environmental data: European Air Quality Index (EAQI) of ${Math.round(aqi)} (scale: 0-100) ${pollutantContext}
    - AQI Category: "${aqiCategory || 'Moderate'}"
    - Time period: ${formattedStartDate} to ${formattedEndDate}
    
    [SEMANTIC CONSTRAINT]: The tone of the poem must be ${constraints.tone}.
    [LEXICAL CONSTRAINT]: Avoid using the words: ${constraints.vocabulary.forbidden.join(', ')}.
    [LEXICAL CONSTRAINT]: Emphasize concepts like: ${constraints.vocabulary.emphasized.join(', ')}.${imageryHints}
    
    The European AQI level "${aqiCategory || 'Moderate'}" should subtly influence the mood:
    - "Good" (0-20): Crystal clear skies, hope, vitality, fresh beginnings, joy
    - "Fair" (21-40): Pleasant atmosphere, everyday life, gentle awareness
    - "Moderate" (41-60): Balance, subtle haze, mindful breathing, caution
    - "Poor" (61-80): Struggle, visible pollution, longing for clarity, endurance
    - "Very Poor" (81-100): Crisis, urgency, calls for change, health concerns
    
    OUTPUT FORMAT:
    First, write the ${length}-line ${poemType.toLowerCase()} about ${city}.
    
    Then, briefly list:
    - Literary influences that informed this poem
    - Environmental context from your research
    
    Requirements:
    - The poem must contain exactly ${length} lines
    - It must follow the style conventions of a ${poemType.toLowerCase()}
    - Draw on real literary traditions and environmental facts from your research
    `;

    // Append structural template from constraint engine
    if (constraints.structure) {
      prompt += constraints.structure;
    }
    
    // Call Google Generative AI API using official SDK
    // Enable Google Search for grounding and citations
    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
        // Enable Google Search tool for literary context and citations
        tools: [{ googleSearch: {} }]
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
      
      if (!poemText) {
        throw new Error("No poem text found in Google AI API response");
      }

      // Parse the text response to separate poem from metadata sections
      const parsedContent = this.parseResponseText(poemText);
      
      // Extract grounding metadata for actual source citations (URLs)
      const groundingMetadata = this.extractGroundingMetadata(response);

      // Combine parsed text sections with grounding metadata
      return {
        poem: parsedContent.poem,
        citations: groundingMetadata.citations,
        literaryInfluences: parsedContent.literaryInfluences.length > 0 
          ? parsedContent.literaryInfluences 
          : groundingMetadata.literaryInfluences,
        environmentalSources: parsedContent.environmentalContext.length > 0
          ? parsedContent.environmentalContext
          : groundingMetadata.environmentalSources,
        searchQueries: groundingMetadata.searchQueries
      };
    } catch (error) {
      console.error("Error generating poem with Google AI:", error);
      throw error;
    }
  }

  /**
   * Parses the text response to separate the poem from literary influences
   * and environmental context sections.
   * 
   * @param {string} text - The full text response from the API
   * @returns {Object} Parsed sections { poem, literaryInfluences, environmentalContext }
   */
  parseResponseText(text) {
    const result = {
      poem: text,
      literaryInfluences: [],
      environmentalContext: []
    };

    try {
      // Split by common section markers
      const sections = text.split(/\*{3,}|\n---\n/);
      
      if (sections.length > 1) {
        // First section is the poem
        result.poem = sections[0].trim();
        
        // Process remaining sections
        const remainingText = sections.slice(1).join('\n');
        
        // Extract Literary Influences section
        const literaryMatch = remainingText.match(/\*{0,2}Literary Influences\*{0,2}([\s\S]*?)(?=\*{0,2}Environmental Context\*{0,2}|$)/i);
        if (literaryMatch) {
          const literaryText = literaryMatch[1];
          // Extract bullet points
          const bullets = literaryText.match(/[*\-•]\s*\*{0,2}([^*\n]+)\*{0,2}:?\s*([^\n*]+(?:\n(?![*\-•]).*)*)/g);
          if (bullets) {
            result.literaryInfluences = bullets.map((bullet, idx) => {
              const cleanBullet = bullet.replace(/^[*\-•]\s*/, '').trim();
              // Extract title (bold text) and description
              const titleMatch = cleanBullet.match(/\*{1,2}([^*]+)\*{1,2}:?\s*(.*)/s);
              if (titleMatch) {
                return {
                  id: idx + 1,
                  title: titleMatch[1].trim(),
                  description: titleMatch[2].trim().replace(/\n/g, ' ')
                };
              }
              return {
                id: idx + 1,
                title: cleanBullet.split(':')[0] || cleanBullet,
                description: cleanBullet.split(':').slice(1).join(':').trim()
              };
            });
          }
        }
        
        // Extract Environmental Context section
        const envMatch = remainingText.match(/\*{0,2}Environmental Context\*{0,2}([\s\S]*?)$/i);
        if (envMatch) {
          const envText = envMatch[1];
          // Extract bullet points
          const bullets = envText.match(/[*\-•]\s*\*{0,2}([^*\n]+)\*{0,2}:?\s*([^\n*]+(?:\n(?![*\-•]).*)*)/g);
          if (bullets) {
            result.environmentalContext = bullets.map((bullet, idx) => {
              const cleanBullet = bullet.replace(/^[*\-•]\s*/, '').trim();
              const titleMatch = cleanBullet.match(/\*{1,2}([^*]+)\*{1,2}:?\s*(.*)/s);
              if (titleMatch) {
                return {
                  id: idx + 1,
                  title: titleMatch[1].trim(),
                  description: titleMatch[2].trim().replace(/\n/g, ' ')
                };
              }
              return {
                id: idx + 1,
                title: cleanBullet.split(':')[0] || cleanBullet,
                description: cleanBullet.split(':').slice(1).join(':').trim()
              };
            });
          }
        }
      }
    } catch (error) {
      console.warn('Error parsing response text:', error);
    }

    return result;
  }

  /**
   * Extracts and categorizes grounding metadata from the API response.
   * Separates literary sources from environmental/factual sources.
   * 
   * @param {Object} response - The API response object
   * @returns {Object} Categorized citations and sources
   */
  extractGroundingMetadata(response) {
    const result = {
      citations: [],
      literaryInfluences: [],
      environmentalSources: [],
      searchQueries: []
    };

    try {
      const candidate = response.candidates?.[0];
      const metadata = candidate?.groundingMetadata;

      if (!metadata) {
        return result;
      }

      // Extract search queries used
      if (metadata.webSearchQueries) {
        result.searchQueries = metadata.webSearchQueries;
      }

      // Process grounding chunks (sources)
      if (metadata.groundingChunks) {
        metadata.groundingChunks.forEach((chunk, index) => {
          if (chunk.web) {
            const source = {
              id: index + 1,
              title: chunk.web.title || 'Unknown Source',
              uri: chunk.web.uri || '',
              domain: chunk.web.domain || this.extractDomain(chunk.web.uri)
            };

            // Add to main citations
            result.citations.push(source);

            // Categorize by domain type
            const domain = source.domain.toLowerCase();
            
            // Literary/cultural domains
            if (this.isLiterarySource(domain)) {
              result.literaryInfluences.push(source);
            }
            // Environmental/scientific domains
            else if (this.isEnvironmentalSource(domain)) {
              result.environmentalSources.push(source);
            }
            // Default to literary if about poetry/literature
            else if (source.title.toLowerCase().match(/poet|poetry|literature|verse|sonnet/)) {
              result.literaryInfluences.push(source);
            }
            // Default to environmental if about air/pollution
            else if (source.title.toLowerCase().match(/air|pollution|quality|aqi|environment/)) {
              result.environmentalSources.push(source);
            }
          }
        });
      }
    } catch (error) {
      console.warn('Error extracting grounding metadata:', error);
    }

    return result;
  }

  /**
   * Checks if a domain is a literary/cultural source
   */
  isLiterarySource(domain) {
    const literaryDomains = [
      'wikipedia.org', 'britannica.com', 'poetryfoundation.org',
      'poets.org', 'poetry.com', 'gutenberg.org', 'jstor.org',
      'academia.edu', 'archive.org', 'literary', 'poetry',
      'culture', 'arts', 'humanities', 'unesco.org'
    ];
    return literaryDomains.some(d => domain.includes(d));
  }

  /**
   * Checks if a domain is an environmental/scientific source
   */
  isEnvironmentalSource(domain) {
    const envDomains = [
      'eea.europa.eu', 'epa.gov', 'who.int', 'iqair.com',
      'airnow.gov', 'open-meteo.com', 'environment', 'climate',
      'pollution', 'air-quality', 'health.gov'
    ];
    return envDomains.some(d => domain.includes(d));
  }

  /**
   * Extracts domain from URL
   */
  extractDomain(url) {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url || 'unknown';
    }
  }
}
