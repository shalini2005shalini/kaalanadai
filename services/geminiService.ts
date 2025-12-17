import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_ID = 'gemini-2.5-flash';

interface GenerateOptions {
  prompt: string;
  image?: string; // base64 string without data prefix
  mimeType?: string;
  language: 'en' | 'ta';
}

export const generateVeterinaryAdvice = async ({
  prompt,
  image,
  mimeType = 'image/jpeg',
  language
}: GenerateOptions): Promise<string> => {
  try {
    const languageInstruction = language === 'ta' 
      ? "Reply strictly in Tamil language." 
      : "Reply strictly in English language.";

    const finalSystemInstruction = `${SYSTEM_INSTRUCTION}\n${languageInstruction}`;

    let contents: any;

    if (image) {
      // Multimodal request (Image + Text)
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: image,
            },
          },
          {
            text: prompt || "Analyze this animal's condition and suggest remedies.",
          },
        ],
      };
    } else {
      // Text-only request
      contents = {
        parts: [{ text: prompt }],
      };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_ID,
      contents: contents,
      config: {
        systemInstruction: finalSystemInstruction,
        temperature: 0.4, // Lower temperature for more accurate medical/farming advice
        maxOutputTokens: 800,
      },
    });

    return response.text || "No response generated.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get advice from Gemini.");
  }
};
