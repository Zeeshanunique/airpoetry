/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Offline Fallback Generator (Resilience Strategy)
 * 
 * This module provides a deterministic fallback mechanism for generating poetry
 * when the primary AI service is unavailable (network issues, API limits, etc.).
 * 
 * RESILIENCE STRATEGY:
 * 1. Detects API failure in the primary service layer.
 * 2. Switches to a local, template-based generation engine.
 * 3. Uses the same input parameters (city, AQI, data) to fill pre-structured 
 *    templates that mimic the structure of the intended output.
 * 4. Ensures the user always receives a "product" even in total system failure.
 */

export const generateOfflineFallbackPoem = (poemType, city, aqi, aqiCategory, fromDate, toDate, poemLength = 14) => {
  // Format dates for readability
  const formattedFromDate = new Date(fromDate).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
  const formattedToDate = new Date(toDate).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
  
  // Use AQI category or derive from value
  const getAQIDescription = (aqiValue) => {
    if (aqiValue <= 50) return "good";
    if (aqiValue <= 100) return "moderate";
    if (aqiValue <= 150) return "unhealthy for sensitive groups";
    if (aqiValue <= 200) return "unhealthy";
    if (aqiValue <= 300) return "very unhealthy";
    return "hazardous";
  };
  
  const aqiDescription = aqiCategory || getAQIDescription(aqi);
  const aqiValue = Math.round(aqi);
  
  // Generate different templates based on poem type
  switch(poemType) {
    case "Sonnet":
      return `[Offline Mode - Network Resilience Active]

The air in ${city} bears a silent weight,
An index of ${aqiValue} floats unseen,
From ${formattedFromDate} to ${formattedToDate},
A quality we'd call "${aqiDescription}" sheen.

What stories do these measurements relate,
Of industry, of progress unforeseen?
The elements that daily we create,
Transform the very air on which we lean.

Each breath we take connects us to this dance,
Of molecules that travel far and wide,
A shared existence given but one chance,

To recognize what we cannot divide:
Our future bound by choices that we make,
The quality of air, for all our sake.`;

    case "Ode":
      return `[Offline Mode - Network Resilience Active]

O Air of ${city}, once clear and bright,
Now measured in an index we embrace,
From ${formattedFromDate} through winter's fading light,
To ${formattedToDate}, at ${aqiValue} we trace.

"${aqiDescription}" - the words that mark our sky,
You move through lungs and lives with silent grace,
Connecting all who breathe without a sigh,
In knowing what they share in common space.

How strange it is to love what we pollute,
To need what we unconsciously degrade,
This paradox we cannot yet refute,

Reveals the fragile balance we have made.
Between our progress and our planet's health,
Between our comfort and our common wealth.`;

    case "Free Verse":
    default:
      return `[Offline Mode - Network Resilience Active]

In ${city}
    the air quality index reads ${aqiValue}
        a number that breathes with us

From ${formattedFromDate}
to ${formattedToDate}
    the measurement tells a story:
        "${aqiDescription}"

What does it mean to say 
    the air quality is "${aqiDescription}"?

It means children play beneath a veil
It means elders breathe with greater labor
It means the invisible has weight
    and consequence

Each number
    a story
        a choice
            a future

The air connects us all
in this breathing world
    where every breath matters`;
  }
};
