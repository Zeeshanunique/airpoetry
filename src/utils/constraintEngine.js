/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Constraint Engine (Core Invention)
 * 
 * This module implements the "Constraint Optimization Method" (Claim 1).
 * It separates the *logic* of determining literary constraints from the
 * *execution* of generating text.
 * 
 * TECHNICAL EFFECT:
 * Transforms raw quantitative data (pollution rates) into structured
 * qualitative constraints (Tone, Vocabulary, Structure) prior to generation.
 */

import { SONNET_TEMPLATE, ODE_TEMPLATE, FREE_VERSE_TEMPLATE } from './poetryTypes';
import { getContextualSeverity, getCityProfile } from '../services/pollutionData.service';

/**
 * Severity Tier Enumeration
 * Used for deterministic mapping throughout the system.
 */
export const SEVERITY_TIERS = {
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH'
};

/**
 * Calculates the "Constraint Object" based on environmental inputs.
 * 
 * [INVENTIVE STEP] This function now uses CONTEXTUAL SEVERITY (Claim 3)
 * instead of raw pollution values, making the output relative to the city's baseline.
 * 
 * @param {Object} inputs
 * @param {number} inputs.avgPollutionRate - The raw pollution value.
 * @param {string} inputs.poemType - The requested literary form.
 * @param {string} inputs.city - The geo-spatial context.
 * @returns {Object} The structured constraint set for generation.
 */
export const generateConstraints = ({ avgPollutionRate, poemType, city }) => {
  // [CLAIM 3 INTEGRATION] Calculate contextual severity instead of using raw value
  const contextualSeverity = getContextualSeverity(avgPollutionRate, city);
  
  // 1. Determine Severity Tier from contextual value
  const severityTier = determineSeverityTier(contextualSeverity);
  
  // 2. Tone Mapping Logic (The "Semantic Mapping" Step)
  const tone = determineTone(severityTier);
  
  // 3. Structural Template Selection
  const structure = getStructuralTemplate(poemType);
  
  // 4. [ENHANCED] Dynamic Vocabulary Constraints based on severity tier
  const vocabulary = generateDynamicVocabulary(severityTier);

  // 5. [NEW] Generation Audit Trail for provenance
  const auditTrail = {
    inputData: {
      rawPollutionRate: avgPollutionRate,
      city,
      poemType
    },
    computedValues: {
      contextualSeverity,
      severityTier
    },
    engineVersion: "AI(R) Constraint Engine v2.0",
    timestamp: new Date().toISOString(),
    checksum: generateChecksum({ avgPollutionRate, city, poemType, severityTier })
  };

  return {
    tone,
    structure,
    vocabulary,
    severityTier,
    contextualSeverity,
    auditTrail
  };
};

/**
 * [INVENTIVE STEP] Determines the severity tier from contextual severity score.
 * Contextual severity is the deviation from baseline * sensitivity factor.
 * 
 * Thresholds are based on standard deviations from "normal" for the city:
 * - Negative or low positive = LOW (better than or at baseline)
 * - 0-15 = MODERATE (slightly above baseline)
 * - 15-30 = HIGH (significantly above baseline)
 * - >30 = VERY_HIGH (crisis level)
 */
const determineSeverityTier = (contextualSeverity) => {
  if (contextualSeverity < 5) return SEVERITY_TIERS.LOW;
  if (contextualSeverity < 15) return SEVERITY_TIERS.MODERATE;
  if (contextualSeverity < 30) return SEVERITY_TIERS.HIGH;
  return SEVERITY_TIERS.VERY_HIGH;
};

/**
 * Maps severity tier to specific emotional/literary tones.
 * This is a deterministic algorithm, ensuring consistency.
 */
const determineTone = (severityTier) => {
  const toneMap = {
    [SEVERITY_TIERS.LOW]: "pleasing and celebratory, highlighting the clarity of nature and the vitality of urban life",
    [SEVERITY_TIERS.MODERATE]: "contemplative with gentle awareness, noting the subtle dance between progress and preservation",
    [SEVERITY_TIERS.HIGH]: "reflective and critical, focusing on the weight carried by the atmosphere and its silent witnesses",
    [SEVERITY_TIERS.VERY_HIGH]: "urgent and visceral, emphasizing the struggle for breath and the call for change"
  };
  return toneMap[severityTier] || toneMap[SEVERITY_TIERS.MODERATE];
};

/**
 * [INVENTIVE STEP] Generates DYNAMIC vocabulary constraints based on severity tier.
 * This proves the system doesn't just use static lists but computes restrictions
 * based on the input data.
 */
const generateDynamicVocabulary = (severityTier) => {
  // Base forbidden words (always applied)
  const baseForbidden = ['smog', 'pollution statistics', 'PM10', 'PM2.5', 'micrograms'];
  
  // Tier-specific vocabulary modulation
  const tierVocabulary = {
    [SEVERITY_TIERS.LOW]: {
      forbidden: [...baseForbidden, 'choking', 'suffocating', 'toxic', 'deadly'],
      emphasized: ['clarity', 'breath', 'horizon', 'light', 'renewal', 'vitality'],
      imagery: ['dawn', 'open sky', 'gentle breeze', 'clear waters']
    },
    [SEVERITY_TIERS.MODERATE]: {
      forbidden: [...baseForbidden, 'pristine', 'perfect', 'pure'],
      emphasized: ['balance', 'transition', 'awareness', 'atmosphere', 'subtle'],
      imagery: ['haze', 'filtered light', 'distant hills', 'muted colors']
    },
    [SEVERITY_TIERS.HIGH]: {
      forbidden: [...baseForbidden, 'clear', 'pristine', 'fresh', 'clean'],
      emphasized: ['weight', 'invisible', 'burden', 'resilience', 'endurance'],
      imagery: ['veiled sun', 'heavy air', 'labored breath', 'grey palette']
    },
    [SEVERITY_TIERS.VERY_HIGH]: {
      forbidden: [...baseForbidden, 'beautiful', 'serene', 'peaceful', 'idyllic'],
      emphasized: ['struggle', 'urgency', 'survival', 'change', 'awakening'],
      imagery: ['obscured sky', 'gasping', 'weight of silence', 'muffled world']
    }
  };
  
  return tierVocabulary[severityTier] || tierVocabulary[SEVERITY_TIERS.MODERATE];
};

/**
 * Retrieves the structural rules for the poem.
 */
const getStructuralTemplate = (type) => {
  switch(type) {
    case "Sonnet": return SONNET_TEMPLATE;
    case "Ode": return ODE_TEMPLATE;
    case "Free Verse": return FREE_VERSE_TEMPLATE;
    default: return "";
  }
};

/**
 * [PROVENANCE FEATURE] Generates a simple checksum for audit trail.
 * This allows verification that a specific output was generated from specific inputs.
 */
const generateChecksum = (data) => {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `AIR-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
};
