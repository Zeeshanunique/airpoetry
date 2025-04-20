/**
 * Mock poetry generator for when the API server is down
 * 
 * This function generates a mock poem when the API is unavailable.
 * For Sonnets, it will always generate 14 lines regardless of poemLength parameter.
 * For other poem types, the mock templates have fixed lengths but the parameter is passed
 * to maintain consistency with the API interface.
 */

export const generateMockPoem = (poemType, city, pollutant, avgPollutionRate, fromDate, toDate, poemLength = 14) => {
  // Note: The mock poems have fixed structures, but we accept poemLength to match the API interface
  // Format dates for readability
  const formattedFromDate = new Date(fromDate).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
  const formattedToDate = new Date(toDate).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
  
  // Determine pollution level
  const getPollutionLevel = (rate) => {
    if (rate <= 12) return "low";
    if (rate <= 36) return "moderate";
    if (rate <= 56) return "high";
    return "very high";
  };
  
  const pollutionLevel = getPollutionLevel(avgPollutionRate);
  
  // Generate different templates based on poem type
  switch(poemType) {
    case "Sonnet":
      return `[Mock ${poemType} - API Server Unavailable]

The air in ${city} bears a silent weight,
As ${pollutant} particles drift unseen,
From ${formattedFromDate} to ${formattedToDate},
At ${avgPollutionRate.toFixed(1)} µg/m³, a ${pollutionLevel} sheen.

What stories do these particles relate,
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
      return `[Mock ${poemType} - API Server Unavailable]

O Air of ${city}, once clear and bright,
Now bearing ${pollutant} in your invisible embrace,
From ${formattedFromDate} through winter's fading light,
To ${formattedToDate}, you carry each trace.

At ${avgPollutionRate.toFixed(1)} µg/m³, ${pollutionLevel} by measure,
You move through lungs and lives with silent grace,
Connecting all who breathe without their pleasure,
In knowing what they share in common space.

How strange it is to love what we pollute,
To need what we unconsciously degrade,
This paradox we cannot yet refute,

Reveals the fragile balance we have made.
Between our progress and our planet's health,
Between our comfort and our common wealth.`;

    case "Free Verse":
    default:
      return `[Mock ${poemType} - API Server Unavailable]

In ${city}
    the particles of ${pollutant} drift
        like memories we'd rather forget

From ${formattedFromDate}
to ${formattedToDate}
    a record kept in data:
        ${avgPollutionRate.toFixed(1)} µg/m³

What does it mean to say 
    the air quality is "${pollutionLevel}"?

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
    where every molecule matters`;
  }
}; 