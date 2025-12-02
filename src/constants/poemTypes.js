/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Poetry type constants
 */

export const POEM_TYPES = {
  SONNET: "Sonnet",
  ODE: "Ode",
  FREE_VERSE: "Free Verse",
};

export const POEM_LENGTHS = {
  [POEM_TYPES.SONNET]: 14, // Fixed for sonnets
  [POEM_TYPES.ODE]: 16,
  [POEM_TYPES.FREE_VERSE]: 12,
};

export const CITIES = ["Bergamo", "Treviglio", "Bizerte"];

export const POLLUTANTS = {
  PM10: "pm10",
  PM25: "pm2.5",
  NO2: "no2",
};

export const TRANSLATION_LANGUAGES = {
  ORIGINAL: "original",
  SPANISH: "es",
  FRENCH: "fr",
  GERMAN: "de",
  ITALIAN: "it",
};
