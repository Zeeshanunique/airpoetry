import { GoogleGenAI } from '@google/genai';
import { GOOGLE_API_KEY, GOOGLE_AI_MODEL } from './config';

export async function translateText(text, targetLanguage) {
  if (!text || !targetLanguage) return text || '';
  if (!GOOGLE_API_KEY) return text;

  const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

  const prompt = `You are a translation engine. Translate the following text into ${targetLanguage}.
Only return the translated text with the same line breaks. Do not add explanations.
\n\nText:\n\n\n${text}`;

  const response = await ai.models.generateContent({
    model: GOOGLE_AI_MODEL,
    contents: prompt,
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1200,
    }
  });

  let translated = '';
  if (response.text) {
    translated = response.text;
  } else if (response.candidates && response.candidates.length > 0) {
    const candidate = response.candidates[0];
    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
      translated = candidate.content.parts[0].text || '';
    }
  }

  return translated || text;
}


