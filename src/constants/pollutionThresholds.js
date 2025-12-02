/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Pollution threshold constants for air quality classification
 */

export const POLLUTION_THRESHOLDS = {
  LOW: 12,
  MODERATE: 36,
  HIGH: 56,
};

export const POLLUTION_LEVELS = {
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

export const POLLUTION_COLORS = {
  LOW: "bg-green-500",
  MODERATE: "bg-yellow-500",
  HIGH: "bg-orange-500",
  VERY_HIGH: "bg-red-500",
};

export const POLLUTION_TEXT_COLORS = {
  LOW: "text-green-500",
  MODERATE: "text-yellow-500",
  HIGH: "text-orange-500",
  VERY_HIGH: "text-red-500",
};

export const SPEEDOMETER_COLORS = [
  "#4ade80", // green-500
  "#a3e635", // lime-500
  "#facc15", // yellow-500
  "#fb923c", // orange-500
  "#ef4444", // red-500
];

export const POLLUTANT_MAX_VALUES = {
  pm10: 100,
  "pm2.5": 60,
  no2: 200,
};

// Use explicit year, month (0-indexed), day to avoid timezone issues
export const DATE_RANGE = {
  MIN_DATE: new Date(2022, 0, 1),
  MAX_DATE: new Date(2023, 11, 31),
};
