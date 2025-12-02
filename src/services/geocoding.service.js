/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Geocoding Service
 * 
 * Uses Open-Meteo Geocoding API (free, no API key required)
 * Converts city names to coordinates for worldwide location support.
 * 
 * API Documentation: https://open-meteo.com/en/docs/geocoding-api
 */

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

// Pre-defined coordinates for known cities (fallback/quick lookup)
const KNOWN_CITIES = {
  'Bergamo': { latitude: 45.6983, longitude: 9.6773, country: 'Italy' },
  'Treviglio': { latitude: 45.5211, longitude: 9.5886, country: 'Italy' },
  'Bizerte': { latitude: 37.2744, longitude: 9.8739, country: 'Tunisia' },
  'Milan': { latitude: 45.4642, longitude: 9.1900, country: 'Italy' },
  'Rome': { latitude: 41.9028, longitude: 12.4964, country: 'Italy' },
  'Paris': { latitude: 48.8566, longitude: 2.3522, country: 'France' },
  'London': { latitude: 51.5074, longitude: -0.1278, country: 'United Kingdom' },
  'Berlin': { latitude: 52.5200, longitude: 13.4050, country: 'Germany' },
  'Madrid': { latitude: 40.4168, longitude: -3.7038, country: 'Spain' },
  'New York': { latitude: 40.7128, longitude: -74.0060, country: 'United States' },
  'Los Angeles': { latitude: 34.0522, longitude: -118.2437, country: 'United States' },
  'Tokyo': { latitude: 35.6762, longitude: 139.6503, country: 'Japan' },
  'Beijing': { latitude: 39.9042, longitude: 116.4074, country: 'China' },
  'Sydney': { latitude: -33.8688, longitude: 151.2093, country: 'Australia' },
  'Mumbai': { latitude: 19.0760, longitude: 72.8777, country: 'India' },
  'Delhi': { latitude: 28.7041, longitude: 77.1025, country: 'India' },
  'São Paulo': { latitude: -23.5505, longitude: -46.6333, country: 'Brazil' },
  'Cairo': { latitude: 30.0444, longitude: 31.2357, country: 'Egypt' },
  'Lagos': { latitude: 6.5244, longitude: 3.3792, country: 'Nigeria' },
  'Singapore': { latitude: 1.3521, longitude: 103.8198, country: 'Singapore' }
};

/**
 * Searches for a city and returns its coordinates.
 * First checks the known cities cache, then falls back to API.
 * 
 * @param {string} cityName - Name of the city to search
 * @returns {Promise<Object>} Location data with coordinates
 */
export const geocodeCity = async (cityName) => {
  // Check known cities first (faster, no API call)
  const normalizedName = cityName.trim();
  if (KNOWN_CITIES[normalizedName]) {
    return {
      success: true,
      city: normalizedName,
      ...KNOWN_CITIES[normalizedName],
      source: 'cache'
    };
  }

  // Fall back to API for unknown cities
  try {
    const params = new URLSearchParams({
      name: normalizedName,
      count: '5',
      language: 'en',
      format: 'json'
    });

    const response = await fetch(`${GEOCODING_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Geocoding API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return {
        success: false,
        error: `City not found: ${cityName}`,
        suggestions: []
      };
    }

    // Return the first (most relevant) result
    const result = data.results[0];
    
    return {
      success: true,
      city: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      admin1: result.admin1, // State/Province
      population: result.population,
      source: 'api',
      alternatives: data.results.slice(1).map(r => ({
        city: r.name,
        country: r.country,
        admin1: r.admin1,
        latitude: r.latitude,
        longitude: r.longitude
      }))
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Returns a list of all known cities (for dropdown/autocomplete)
 */
export const getKnownCities = () => {
  return Object.keys(KNOWN_CITIES).map(name => ({
    name,
    ...KNOWN_CITIES[name]
  }));
};

/**
 * Checks if a city is in the known cities cache
 */
export const isKnownCity = (cityName) => {
  return KNOWN_CITIES.hasOwnProperty(cityName.trim());
};

