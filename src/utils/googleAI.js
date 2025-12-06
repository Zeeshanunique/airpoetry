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
        config: {
          temperature: 0.7,
          // Increased significantly for Gemini 2.5 Pro which uses "thinking" tokens
          // Budget: ~2000 for thinking + ~1000 for tool use + ~2000 for poem output
          maxOutputTokens: 8192,
          // Enable Google Search tool for literary context and citations
          tools: [{ googleSearch: {} }]
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
          // Concatenate all text parts
          poemText = candidate.content.parts
            .filter(part => part.text)
            .map(part => part.text)
            .join('\n');
        } else if (candidate.text) {
          poemText = candidate.text;
        }
      }
      
      if (!poemText) {
        throw new Error("No poem text found in Google AI API response");
      }

      // DEBUG: Log the raw text
      console.log('=== RAW POEM TEXT ===');
      console.log(poemText);
      console.log('=== END RAW TEXT ===');

      // Parse the text response to separate poem from metadata sections
      const parsedContent = this.parseResponseText(poemText);
      
      // DEBUG: Log parsed content
      console.log('=== PARSED CONTENT ===');
      console.log('Poem length:', parsedContent.poem.length);
      console.log('Literary Influences count:', parsedContent.literaryInfluences.length);
      console.log('Literary Influences:', JSON.stringify(parsedContent.literaryInfluences, null, 2));
      console.log('Environmental Context count:', parsedContent.environmentalContext.length);
      console.log('Environmental Context:', JSON.stringify(parsedContent.environmentalContext, null, 2));
      console.log('=== END PARSED ===');
      
      // Extract grounding metadata for actual source citations (URLs)
      const groundingMetadata = this.extractGroundingMetadata(response);

      // DEBUG: Log grounding metadata
      console.log('=== GROUNDING METADATA ===');
      console.log('Citations count:', groundingMetadata.citations.length);
      console.log('Search queries:', groundingMetadata.searchQueries);
      console.log('=== END GROUNDING ===');

      // Combine parsed text sections with grounding metadata
      // Literary influences: prefer parsed text, fallback to grounding metadata
      // Environmental sources: prefer parsed text, fallback to grounding metadata
      // Citations: from grounding metadata (actual web URLs)
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
      // Look for Literary Influences section header (supports multiple formats)
      // Format 1: ### Literary Influences
      // Format 2: **Literary Influences:**
      const literaryHeaderMatch = text.match(/(?:#{1,3}\s*|\*{2})Literary Influences(?:\*{2})?:?/i);
      const envHeaderMatch = text.match(/(?:#{1,3}\s*|\*{2})Environmental Context(?:\*{2})?:?/i);
      
      // Find the poem end (before any section headers or *** divider)
      let poemEndIndex = text.length;
      
      // Check for *** or --- dividers first
      const dividerMatch = text.match(/\n\*{3,}\n|\n---\n/);
      if (dividerMatch) {
        poemEndIndex = Math.min(poemEndIndex, dividerMatch.index);
      }
      
      if (literaryHeaderMatch) {
        poemEndIndex = Math.min(poemEndIndex, literaryHeaderMatch.index);
      }
      if (envHeaderMatch) {
        poemEndIndex = Math.min(poemEndIndex, envHeaderMatch.index);
      }
      
      // Extract the poem (everything before headers/dividers)
      result.poem = text.substring(0, poemEndIndex).trim();
      
      // Clean up any trailing citation markers from the poem
      result.poem = result.poem.replace(/\[cite[:\s]*[\d,\s]+\]/gi, '').trim();
      
      // Extract Literary Influences section if present
      if (literaryHeaderMatch) {
        const startIndex = literaryHeaderMatch.index + literaryHeaderMatch[0].length;
        // Find the end (next section or end of text)
        let endIndex = text.length;
        if (envHeaderMatch && envHeaderMatch.index > startIndex) {
          endIndex = envHeaderMatch.index;
        }
        
        const literaryText = text.substring(startIndex, endIndex).trim();
        
        // Try bullet points first, then paragraphs
        const items = this.parseBoldBulletItems(literaryText);
        if (items.length > 0) {
          result.literaryInfluences = items;
        } else {
          // Parse as paragraph
          const paragraphItems = this.parseParagraphContent(literaryText, 'Literary');
          if (paragraphItems.length > 0) {
            result.literaryInfluences = paragraphItems;
          }
        }
      }
      
      // Extract Environmental Context section if present
      if (envHeaderMatch) {
        const startIndex = envHeaderMatch.index + envHeaderMatch[0].length;
        const envText = text.substring(startIndex).trim();
        
        // Try bullet points first, then paragraphs
        const items = this.parseBoldBulletItems(envText);
        if (items.length > 0) {
          result.environmentalContext = items;
        } else {
          // Parse as paragraph
          const paragraphItems = this.parseParagraphContent(envText, 'Environmental');
          if (paragraphItems.length > 0) {
            result.environmentalContext = paragraphItems;
          }
        }
      }
    } catch (error) {
      console.warn('Error parsing response text:', error);
    }

    return result;
  }

  /**
   * Helper to parse bold bullet items in format:
   * *   **Title:** Description text here
   * or
   * *   ***Title*:** Description
   */
  parseBoldBulletItems(text) {
    const items = [];
    
    // Remove citation markers
    const cleanText = text.replace(/\[cite[:\s]*[\d,\s]+\]/gi, '');
    
    // Match: *   **Title:** Description (handles nested asterisks for italics)
    // Pattern: bullet, optional spaces, bold title (may contain italics), colon, description
    const bulletRegex = /\*\s+\*{2,3}([^*]+(?:\*[^*]+\*)?[^*]*)\*{2,3}:?\s*([^\n*]+(?:\n(?!\*\s).*)*)/g;
    let match;
    
    while ((match = bulletRegex.exec(cleanText)) !== null) {
      let title = match[1].trim().replace(/\*+/g, ''); // Remove any remaining asterisks
      let description = match[2].trim().replace(/\n/g, ' ');
      
      if (title && title.length > 2) {
        items.push({
          id: items.length + 1,
          title,
          description
        });
      }
    }
    
    // If no matches, try simpler pattern for plain bullets
    if (items.length === 0) {
      const simpleBulletRegex = /[*\-•]\s+([^:\n]+):\s*([^\n]+(?:\n(?![*\-•]).*)*)/g;
      while ((match = simpleBulletRegex.exec(cleanText)) !== null) {
        let title = match[1].trim().replace(/\*+/g, '');
        let description = match[2].trim().replace(/\n/g, ' ');
        
        if (title && title.length > 2) {
          items.push({
            id: items.length + 1,
            title,
            description
          });
        }
      }
    }
    
    return items;
  }

  /**
   * Helper to parse paragraph content into structured items
   * Splits by sentences and creates meaningful chunks
   */
  parseParagraphContent(text, type = 'General') {
    const items = [];
    
    // Remove citation markers and clean up
    const cleanText = text
      .replace(/\[cite[:\s]*[\d,\s]+\]/gi, '')
      .replace(/\*+/g, '')
      .trim();
    
    if (!cleanText || cleanText.length < 20) {
      return items;
    }
    
    // Split into sentences
    const sentences = cleanText.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 15);
    
    if (sentences.length === 0) {
      // If no sentence breaks, use the whole text
      items.push({
        id: 1,
        title: `${type} Context`,
        description: cleanText.substring(0, 500)
      });
      return items;
    }
    
    // Group 2-3 sentences per item for better readability
    let currentGroup = [];
    let itemCount = 0;
    
    for (let i = 0; i < sentences.length; i++) {
      currentGroup.push(sentences[i].trim());
      
      // Create item after 2-3 sentences or at the end
      if (currentGroup.length >= 2 || i === sentences.length - 1) {
        const description = currentGroup.join(' ');
        
        // Extract a meaningful title from first sentence
        const firstSentence = currentGroup[0];
        let title;
        
        // Look for named entities or key phrases
        const namedMatch = firstSentence.match(/(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
        if (namedMatch && namedMatch[1].length > 3) {
          title = namedMatch[1];
        } else {
          // Use first 40 chars as title
          title = firstSentence.substring(0, 40).replace(/[,.]$/, '') + '...';
        }
        
        items.push({
          id: ++itemCount,
          title,
          description
        });
        
        currentGroup = [];
        
        // Limit to 3 items max
        if (itemCount >= 3) break;
      }
    }
    
    return items;
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
