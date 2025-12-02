/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Configuration file for API keys and other settings
 */

// Google API key
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// Google AI model
export const GOOGLE_AI_MODEL = process.env.REACT_APP_GOOGLE_AI_MODEL || "gemini-2.5-pro";