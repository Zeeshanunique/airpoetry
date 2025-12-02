/**
 * Helper functions for pollution-related calculations and formatting
 */
import {
  POLLUTION_THRESHOLDS,
  POLLUTION_LEVELS,
  POLLUTION_COLORS,
  POLLUTION_TEXT_COLORS,
  SPEEDOMETER_COLORS,
  POLLUTANT_MAX_VALUES,
} from "../constants/pollutionThresholds";

/**
 * Get pollution level color class based on rate
 */
export const getPollutionLevelColor = (rate) => {
  if (rate <= POLLUTION_THRESHOLDS.LOW) return POLLUTION_COLORS.LOW;
  if (rate <= POLLUTION_THRESHOLDS.MODERATE) return POLLUTION_COLORS.MODERATE;
  if (rate <= POLLUTION_THRESHOLDS.HIGH) return POLLUTION_COLORS.HIGH;
  return POLLUTION_COLORS.VERY_HIGH;
};

/**
 * Get pollution level text color class based on rate
 */
export const getPollutionLevelTextColor = (rate) => {
  if (rate <= POLLUTION_THRESHOLDS.LOW) return POLLUTION_TEXT_COLORS.LOW;
  if (rate <= POLLUTION_THRESHOLDS.MODERATE) return POLLUTION_TEXT_COLORS.MODERATE;
  if (rate <= POLLUTION_THRESHOLDS.HIGH) return POLLUTION_TEXT_COLORS.HIGH;
  return POLLUTION_TEXT_COLORS.VERY_HIGH;
};

/**
 * Get pollution level text based on rate
 */
export const getPollutionLevelText = (rate) => {
  if (rate <= POLLUTION_THRESHOLDS.LOW) return POLLUTION_LEVELS.LOW;
  if (rate <= POLLUTION_THRESHOLDS.MODERATE) return POLLUTION_LEVELS.MODERATE;
  if (rate <= POLLUTION_THRESHOLDS.HIGH) return POLLUTION_LEVELS.HIGH;
  return POLLUTION_LEVELS.VERY_HIGH;
};

/**
 * Get speedometer colors array
 */
export const getSpeedometerColors = () => SPEEDOMETER_COLORS;

/**
 * Get maximum pollution value for speedometer based on pollutant type
 */
export const getMaxPollutionValue = (pollutant) => {
  return POLLUTANT_MAX_VALUES[pollutant] || 100;
};

/**
 * Get tone description based on pollution rate
 */
export const getPollutionTone = (avgPollutionRate) => {
  if (avgPollutionRate < 12) return "pleasing";
  if (avgPollutionRate < 36) return "low criticism";
  if (avgPollutionRate < 56) return "moderate and critical";
  return "more critical and rough";
};
